export enum AcceptStatus {
    APPROVE = 'APPROVE',
    WAITING_APPROVE = 'WAITING_APPROVE',
    REQUEST_CHECK_AGAIN = 'REQUEST_CHECK_AGAIN',
    CHECKED_AGAIN = 'CHECKED_AGAIN',
    REJECT = 'REJECT',
}

export const AcceptStatusOptions = [
    {
        label: 'app.acceptStatus.approve',
        value: AcceptStatus.APPROVE,
    },
    {
        label: 'app.acceptStatus.checkedAgain',
        value: AcceptStatus.CHECKED_AGAIN,
    },
    {
        label: 'app.acceptStatus.requestCheckAgain',
        value: AcceptStatus.REQUEST_CHECK_AGAIN,
    },
    {
        label: 'app.acceptStatus.waitingApprove',
        value: AcceptStatus.WAITING_APPROVE,
    },
    {
        label: 'app.acceptStatus.reject',
        value: AcceptStatus.REJECT,
    },
];
