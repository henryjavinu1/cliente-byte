import { api } from "@/app/api/services/axiosClient";
import { getPersons, createPerson, updatePerson, deletePerson } from "@/app/api/services/person.services";

jest.mock("@/app/api/services/axiosClient");

describe("Person Services", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("getPersons hace GET correctamente", async () => {
    (api.get as jest.Mock).mockResolvedValue({
      data: {
        data: [],
        total: 0,
        page: 1,
        limit: 5,
      },
    });

    const resp = await getPersons(1, 5, "id", "ASC");

    expect(api.get).toHaveBeenCalled();
    expect(resp.page).toBe(1);
  });

  it("createPerson hace POST correctamente", async () => {
    (api.post as jest.Mock).mockResolvedValue({
      data: { ID: 1, Name: "Test" },
    });

    const resp = await createPerson({
      NIT: "1234567-9",
      Name: "Test",
      Address: "X",
      Phone_Number: "123",
      details: [],
    });

    expect(api.post).toHaveBeenCalled();
    expect(resp.ID).toBe(1);
  });

  it("updatePerson hace PUT correctamente", async () => {
    (api.put as jest.Mock).mockResolvedValue({
      data: { ID: 1, Name: "Editado" },
    });

    const resp = await updatePerson(1, { Name: "Editado" });

    expect(api.put).toHaveBeenCalled();
    expect(resp.Name).toBe("Editado");
  });

  it("deletePerson hace DELETE correctamente", async () => {
    (api.delete as jest.Mock).mockResolvedValue({
      data: { deleted: true },
    });

    const resp = await deletePerson(1);

    expect(api.delete).toHaveBeenCalled();
    expect(resp.deleted).toBe(true);
  });
});
