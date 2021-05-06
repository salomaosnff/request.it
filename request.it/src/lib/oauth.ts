export type OAuth2Secret = { secret: string };
export type OAuth2AccessToken = { accessTokenUrl: string };

export type OAuth2 = { clientId: string };

export type OAuthAuthorization = {
    authorizationUrl: string
    redirectUrl?: string
    scope?: string
};

export type OAuth2Code = { grantType: 'authorization_code' } & (
    OAuth2 
    & OAuthAuthorization 
    & OAuth2Secret 
    & OAuth2AccessToken
);

export type OAuth2Implicit = { grantType: 'implicit' } & (
    OAuth2
    & OAuthAuthorization
);

export type OAuth2Password = {
    grantType: 'password'
    username: string
    password: string } & (
    OAuth2 
    & OAuth2Secret
    & OAuth2AccessToken
);

export type OAuth2ClientCredentials = { grantType: 'client_credentials' } & (
    OAuth2
    & OAuth2AccessToken
    & OAuth2Secret
);
export type RequestAuthOAuth2 = { type: 'OAuth2' } & (
    OAuth2Password
    | OAuth2Code
    | OAuth2Implicit
    | OAuth2ClientCredentials
);