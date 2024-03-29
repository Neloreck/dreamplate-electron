import { Optional } from "@/lib/types";
import { setLocalStorageItem, removeLocalStorageItem, getFromLocalStorage } from "@/lib/utils";
import { forSeconds } from "@/lib/utils/delay";

describe("Local storage utils test.", () => {
  const EXPECTED_KEY: string = "some-value-key-" + Math.random() * 1000;
  const EXPECTED_DATA: string = "some-value-data-" + Math.random() * 1000;

  afterAll(async () => {
    removeLocalStorageItem(EXPECTED_KEY);

    await forSeconds(1);
  });

  it("Should correctly clean encoded values.", async () => {
    setLocalStorageItem(EXPECTED_KEY, EXPECTED_DATA);
    removeLocalStorageItem(EXPECTED_KEY);

    expect(getFromLocalStorage(EXPECTED_KEY)).toBeNull();

    await forSeconds(1);
  });

  it("Should correctly save encoded values.", async () => {
    setLocalStorageItem(EXPECTED_KEY, EXPECTED_DATA);
    expect(getFromLocalStorage(EXPECTED_KEY)).toBe(EXPECTED_DATA);

    removeLocalStorageItem(EXPECTED_KEY);

    await forSeconds(1);
  });

  it("Should correctly encode key.", async () => {
    setLocalStorageItem(EXPECTED_KEY, EXPECTED_DATA);

    const receivedFromLocalStorage: Optional<string> = localStorage.getItem(EXPECTED_KEY);

    expect(receivedFromLocalStorage).not.toBe(EXPECTED_DATA);

    removeLocalStorageItem(EXPECTED_KEY);

    await forSeconds(1);
  });
});
