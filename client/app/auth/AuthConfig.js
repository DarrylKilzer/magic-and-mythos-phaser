import store from "../store.js";

const domain = "othercornergames.us.auth0.com";
const audience = "https://magic-and-mythos.com";
const clientId = "Kqk5ZYxRXcWgMGOGAYUNOLIVR2aBK6wN";


export const AuthService = $AuthProvider.initializeAuth({
    domain,
    clientId,
    audience,
    onRedirectCallback: appState => {
        router.push(
            appState && appState.targetUrl
                ? appState.targetUrl
                : window.location.pathname
        )
    }
})


AuthService.on(AuthService.AUTH_EVENTS.AUTHENTICATED, async () => {
    store.commit("user", AuthService.user)
    // AppState.user = AuthService.user
    // $resource.defaultHeaders.Authorization = AuthService.bearer
    // await profileService.getProfile()
})

AuthService.on(AuthService.AUTH_EVENTS.LOADED, () => {
    // AppState.$auth = reactive(AuthService)
})