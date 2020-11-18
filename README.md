# Setup nextjs environment variables (Airtable)
```
yarn add airtable
```
> .env
AIRTABLE_API_KEY=
AIRTABLE_BASE_ID=
AIRTABLE_TABLE_NAME=
AUTH0_DOMAIN=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_ID=
COOKIE_SECRET=

[Airtable docs](https://airtable.com/)

# authentication
[docs](https://auth0.com/)
[nextjs with auth github](https://github.com/auth0/nextjs-auth0)
setup callback url and logout url in docs

set guard for authorise user from auth0
```javascript
auth0.requireAuthentication()

```

# useContext
- export context provider
- export context

# Tailwind
```
yarn add tailwindcss postcss-preset-env
```