export type ParserZodEsque<TInput, TParsedInput> = {
  _input: TInput;
  _output: TParsedInput;
};

export type ParserMyZodEsque<TInput> = {
  parse: (input: unknown) => TInput;
};

export type ParserYupEsque<TInput> = {
  validateSync: (input: unknown) => TInput;
};

export type ParserCustomValidatorEsque<TInput> = (input: unknown) => TInput;

export type ParserWithoutInput<TInput> =
  | ParserMyZodEsque<TInput>
  | ParserYupEsque<TInput>
  | ParserCustomValidatorEsque<TInput>;

export type ParserWithInputOutput<TInput, TParsedInput> = ParserZodEsque<
  TInput,
  TParsedInput
>;

export type Parser =
  | ParserWithInputOutput<unknown, unknown>
  | ParserWithoutInput<unknown>;

export type inferParser<TParser extends Parser> =
  TParser extends ParserWithInputOutput<infer $TIn, infer $TOut>
    ? {
        in: $TIn;
        out: $TOut;
      }
    : TParser extends ParserWithoutInput<infer $InOut>
    ? {
        in: $InOut;
        out: $InOut;
      }
    : never;
