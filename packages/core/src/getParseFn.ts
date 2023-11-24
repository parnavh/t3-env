import { Parser, inferParser } from "./parser";

export type ParseFn<TType> = (value: unknown) => Promise<TType> | TType;

export function getParseFn<TParser extends Parser>(
  procedureParser: TParser
): ParseFn<inferParser<TParser>["out"]> {
  if (typeof procedureParser === "function") {
    // ParserCustomValidatorEsque
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return
    return procedureParser as any;
  }

  if ("parse" in procedureParser) {
    // ParserZodEsque
    // ParserMyZodEsque
    // ParserValibotEsque
    return procedureParser.parse.bind(procedureParser);
  }

  if ("create" in procedureParser) {
    // ParserSuperstructEsque
    return procedureParser.create.bind(procedureParser);
  }

  if ("validateSync" in procedureParser) {
    // ParserYupEsque
    return procedureParser.validateSync.bind(procedureParser);
  }

  throw new Error("Could not find a validator fn");
}
