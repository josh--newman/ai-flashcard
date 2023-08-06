interface Params {
  assignmentId: string;
  success: boolean;
  numFailures: number;
}

const gradeAssignment = ({ assignmentId, success, numFailures }: Params) => {
  return fetch(`api/assignment/${assignmentId}/grade`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      success,
      numFailures,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle the response data here
      console.log(data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      console.error("Error:", error);
    });
};

export default gradeAssignment;
