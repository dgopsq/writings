---
title: Using Auth0 with Expo in the Managed Workflow
description: How to use the Auth0 React Native SDK in a managed Expo application without ejecting from the Expo ecosystem.
website_date: 2021-07-09
tags: Expo, React Native, Auth0, Authentication
published: true
canonical_url: https://www.dgopsq.space/blog/auth0-expo-integration
---

Here I am, once again writing something about Expo! Today I want to cover an interesting argument, which is the integration with [Auth0](https://auth0.com/docs/connections/identity-providers-social).

## What is Auth0

Auth0 is an authentication (and authorization) platform providing a lot of very useful features to allow users to signup and login into your application. Whether you need a full oAuth2 authentication flow, or a simple username/password login with Auth0 you will have it implemented in just a few lines of code.

Personally I'm quite positive using these technologies while building a new application, especially when you have very sensible data. Managing the users and their credentials is always a delicate subject and most of the time much more expensive than a monthly subscription.

## Compatibility with Expo

When in our team decided to use Auth0 and Expo the first thing I did was check for the compatibility. Expo is awesome to build applications using React Native, but it's a bit of a walled garden: features like the _Cloud Building_ and _over-the-air updates_ are specific for the **Managed Workflow** and will work out of the box just using supported Expo modules. When we need to _eject_ an Expo app to use a particular React Native library or because we need to go a bit more "low level" we are talking about the **Bare Workflow** ([here](https://docs.expo.io/introduction/managed-vs-bare/) you can find more details about this topic).

!> With the new [EAS Build](https://docs.expo.io/build/introduction/) this requirement has been removed. We can build a React Native application in the cloud and have over-the-air updates even in **Bare Workflows**, although it's still a preview feature.

Turns out that Auth0 is not _effectively_ supported by Expo. When there's not an `expo-something` module and the library to integrate needs a `pod install` ([here the link](https://auth0.com/docs/quickstart/native/react-native/00-login) to the Auth0 React Native SDK) usually we can conclude that we'll have to eject our application from the magical Expo garden.

Luckily this was not the case! 🥳

## The integration

Following the tutorial I linked before, and more specifically the [Github repo](https://github.com/auth0/react-native-auth0#ios) we can see that the Objective-C binding described is just needed to open a browser page:

```objectivec
#import <React/RCTLinkingManager.h>

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options
{
  return [RCTLinkingManager application:app openURL:url options:options];
}
```

The rest of the stuff in the tutorial are just changes to the `Info.plist` file, and they can be done easily without ejecting our application through the `app.config.ts` (or `app.json`) modifying the `ios.infoPlist` value:

```typescript
const appConfig: ExpoConfig = {
  // ...

  ios: {
    infoPlist: {
      CFBundleURLTypes: [
        {
          CFBundleTypeRole: 'None',
          CFBundleURLName: 'auth0',
          CFBundleURLSchemes: ['$(PRODUCT_BUNDLE_IDENTIFIER)'],
        },
      ],
    },
  },

  // ...
}
```

We **don't** really need to add these lines though because using the SDK without linking it with the React Native ecosystem through `pod install` will allow us to **only use the functions that do not need to open a browser window or handle deep links**, like `passwordRealm`:

```typescript
auth0.auth.passwordRealm({
  username: 'hello@email.com',
  password: 'best_password',
  realm: 'UsernamePasswordConnection',
})
```

## Using Auth0 web-based authentication

Even if we can't use the SDK for a web-based authentication, we can still leverage the [Auth0 API](https://auth0.com/docs/api) and the [AuthSession](https://docs.expo.io/versions/latest/sdk/auth-session/) component from Expo. With AuthSession we can let the user do a complete authentication flow in the browser (such as oAuth). The module will start a browser session and will listen for the user to come back into the application through a [Deep Link](https://docs.expo.io/guides/linking/).

To start using Auth0 with AuthSession we first need to setup a [Social Login](https://auth0.com/learn/social-login/) on the Auth0 dashboard. After that we need to start an authentication session pointing to `https://your-domain.auth0.com/authorize` with the [correct query parameters](https://auth0.com/docs/api/authentication#social):

```typescript
const returnUrl = AuthSession.makeRedirectUri()

const queryParams = toQueryString({
  response_type: 'token',
  client_id: 'client_id',
  connection: 'connection',
  redirect_uri: returnUrl,
})

const authUrl = `https://${domain}/authorize?${queryParams}`

AuthSession.startAsync({
  returnUrl,
  authUrl,
})
  .then(console.log)
  .error(console.error)
```

This code will open a browser page to the Auth0 endpoint, redirecting the user to the specific authentication provider based on the `connection` parameter. The `returnUrl` variable contains the deep link URL of our application and AuthSession will be waiting for the user to be redirected back there signaling the authentication flow's end.

That's all! ✌️
