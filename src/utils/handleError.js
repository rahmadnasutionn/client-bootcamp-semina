const handleError = (error) => {
    let dataErr = {};
    let setMessage = '';
    let setStep = '';

    const { response, message } = error;

    const status = response ? response.status : null;

    try {
        setMessage = response ?.data?.data?.message || message;
        setStep = response?.data?.data?.step || '';
    } catch (error) {
        console.log(error);
    }

    switch (status) {
        case 400:
            dataErr = {
                data: response,
                code: response.status,
                message: response?.data ?.message || setMessage,
                desc: 'Bad Request'
            };
            Break;

        case 401:
            dataErr = {
                code: response.status,
                message: setMessage,
                desc: 'Unauthorized'
            };

            window.location.href = `${window.location.origin}/dashboard`;

            localStorage.clear();
            break;
        default:
            break;
    }
}

export default handleError;