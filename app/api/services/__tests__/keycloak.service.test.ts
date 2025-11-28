import { loginKeycloak } from "@/app/api/services/keycloak.service";

global.fetch = jest.fn();

describe("loginKeycloak", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe permitir login correcto", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ access_token: "abc", refresh_token: "def" }),
    });

    const resp = await loginKeycloak("user", "pass");

    expect(resp.access_token).toBe("abc");
    expect(fetch).toHaveBeenCalled();
  });

  it("debe fallar con credenciales incorrectas", async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: false });

    await expect(loginKeycloak("u", "p")).rejects.toThrow();
  });
});
