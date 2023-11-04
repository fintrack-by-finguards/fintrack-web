export async function postApi(data, url) {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };

    let json_respon = await fetch(url, requestOptions);
    let res = await json_respon.json();
    return res;
  } catch (err) {
    console.log(err.message);
    return {
      err: true,
    };
  }
}

export async function getApi(url) {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    let json_respon = await fetch(url, requestOptions);
    let res = await json_respon.json();
    return res;
  } catch (err) {
    console.log(err.message);
    return {
      err: true,
    };
  }
}
