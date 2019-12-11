const didUserQuizYesterday = async id => {
  const didUserQuizURL =
    "https://asia-northeast1-qlab-cc.cloudfunctions.net/didUserQuizYesterday";

  const query = didUserQuizURL + `?user_id=${id}`;
  console.log("Did User Quiz Called");
  try {
    const response = await fetch(query, {
      credentials: "omit"
    });
    return response.json();
  } catch (error) {
    console.log(error);
    return;
  }
};

const updatePoints = async (firestore, user_id, points) => {
  console.log("Add Points Called");
  firestore
    .collection("users")
    .doc(user_id)
    .update({
      q_points: firestore.FieldValue.increment(points)
    })
    .catch(e => {
      console.log("err :", e);
    });
  console.log("Points from Investment Added");
};

const removeInvestment = async (firestore, user, investment_id) => {
  console.log("Remove Investment Called");
  const newInvestments = user.profile.investments.filter(investment => {
    return investment.user_id !== investment_id;
  });
  firestore
    .collection("users")
    .doc(user.user_id)
    .update({
      investments: newInvestments
    })
    .catch(e => {
      console.log("err :", e);
    });
};

export const resolveInvestment = (investments, user) => {
  return async (dispatch, getState, { getFirestore }) => {
    console.log("Resolve Investment Called");
    const firestore = getFirestore();
    const now = new Date();
    const oneDay = 60 * 60 * 24 * 1000;

    if (investments.length > 0) {
      // For Each Investment
      investments.forEach(async investment => {
        // Check if investment old enough
        if (now - investment.date.toDate() < oneDay) {
          //Investment not Resolved yet, skip it
          console.log("Investment Not Resolved Yet");
          return;
        } else {
          console.log("Attempting to Resolve Investment..");
          const response = await didUserQuizYesterday(investment.user_id);
          if (!response) {
            //Probably an Error
            return;
          }
          const investmentDidQuiz = response.data;
          // If No Payout,
          if (!investmentDidQuiz.payout) {
            console.log("User Didn't Do Quiz");
            dispatch({
              type: "RESOLVE_INVESTMENT",
              income: 0,
              payout: false
            });
            removeInvestment(firestore, user, investment.user_id);
          } else {
            //If Payout
            console.log("User Did Do Quiz, Updating Points");
            updatePoints(firestore, user.user_id, investment.earnable_points);
            dispatch({
              type: "RESOLVE_INVESTMENT",
              income: investment.earnable_points,
              payout: true
            });
            removeInvestment(firestore, user, investment.user_id);
          }
        }
      });
    } else {
      console.log("No Investments");
      return;
    }

    // const newInvestments = user.userProfile.investments.filter(investment => {
    //   return investment.user_id !== investments.user_id;
    // });
    // firestore
    //   .collection("users")
    //   .doc(user.user_id)
    //   .update({
    //     investments: newInvestments
    //   })
    //   .then(() => {
    //     console.log("Investment Removed");
    //     firestore
    //       .collection("users")
    //       .doc(user.user_id)
    //       .get()
    //       .then(res => {
    //         const doc = res.docs[0];
    //         return doc.data();
    //       })
    //       .then(data => {
    //         dispatch({
    //           type: "GET_INVESTMENTS",
    //           investments: data.investments
    //         });
    //       });
    //   })
    //   .catch(e => {
    //     console.log("err :", e);
    //   });
  };
};

export const notificationRead = () => {

  return dispatch => {
    console.log("Investment Notification Read");
    dispatch({
      type: "INVESTMENT_NOTIFICATION_READ"
    });
  };
};
