/**
 * @author Marco Goebel
 */

const competitionStorage = require("../../src/modules/persistance/lowdb/competition-storage");

const COMP_ERROR_MESSAGES = competitionStorage.COMP_ERROR_MESSAGES;

describe("openStorage()", () => {
    test("When_FilePathIsUndefined_Expect_FilePathIsNotDefinedException", () => {
        // ARRANGE: set input values
        const filePath = null;
        const useInMemory = false;

        // ASSERT
        expect(() => {
            competitionStorage.openStorage(filePath, useInMemory)
        }).toThrow(COMP_ERROR_MESSAGES.FilePathIsUndefinedException);
    });
});