import { AuthService } from "./AuthService";

async function testAuth() {
  const service = new AuthService();
  const loginResult = await service.login("jennatestuser", "2]]jXv*7}Z5U]-;");
  console.log(loginResult.getSignInUserSession().getIdToken().getJwtToken());
}

testAuth();