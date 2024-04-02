const sortRequests = (requests, userId) => {
    const sent = [];
    const received = [];

    for (const request of requests) {
        if (request.fromId === userId) {
            sent.push(request);
        } else if (request.toId === userId) {
            received.push(request);
        }
    }

    return {
        sent,
        received,
    };
}

export default sortRequests;