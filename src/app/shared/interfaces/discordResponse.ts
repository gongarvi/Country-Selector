export interface TokenResponse{
    access_token: string,
    expires_in: number,
    refresh_token: string,
    scope: string,
    token_type: string
}

export interface DiscordUser{
    id: number,
    username: string,
    discriminator: string,
    avatar: string,
    avatarBlob?: string|ArrayBuffer
}