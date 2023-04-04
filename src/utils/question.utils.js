export const showQuestion = (questions, counter) => {
  const arrQuestions = questions[counter];
  const question = arrQuestions?.theQuestion;
  return question;
};

export const handleResult = (showResult, res, good, wrong) => {
  if (showResult) {
    if (res.good_one) {
      return good;
    } else {
      return wrong;
    }
  } else {
    return "";
  }
};
