function FunctionParenthesisAndParameters () {
  const square  = (a: number) => a * a;
  const plusOne = (a: number) => a + 1;
  const twoSquared = square(2);
  const threePlusOne = plusOne(3);

  return (
    <>
      <h3>Optional Parenthesis, parameters</h3>
      twoSquared = { twoSquared }<br />
      threePlusOne = { threePlusOne }<br />
      square(2) = { square(2) }<br />
      threePlusOne(3) = { plusOne(3) }<br />
    </>
  )
}

export default FunctionParenthesisAndParameters;