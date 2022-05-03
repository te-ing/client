export interface OauthData {
  message: string;
  accessToken: string;
  id: number;
  nickname: string;
  socialType: string;
}

export interface PostOauthResponse {
  data: OauthData;
}

export interface PostOauthBody {
  access_token: string;
}
