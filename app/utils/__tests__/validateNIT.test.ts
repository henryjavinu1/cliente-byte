import { validateNIT } from "@/app/utils/validateNIT";

describe("validateNIT", () => {
  it("debe validar un NIT correcto", () => {
    const result = validateNIT("1234567-9"); 
    expect(result.valid).toBe(true);
  });

  it("debe rechazar NIT con letras", () => {
    const result = validateNIT("ABC1234-5");
    expect(result.valid).toBe(false);
  });

  it("debe detectar dígito verificador incorrecto", () => {
    const result = validateNIT("1234567-K"); 
    expect(result.valid).toBe(false);
    expect(result.reason).toContain("Dígito verificador incorrecto");
  });
});
