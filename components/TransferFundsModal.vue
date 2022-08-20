<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="whole-modal" data-aos="fade-in">
        <div class="modal" data-aos="fade-up">
            <img src="@/assets/icons/arrow-left.svg" alt="Go back" @click="$emit('close-transfer-modal'); foundUser = undefined; accountTag = ''; amount = ''; comment = ''">
            <p class="modal-name">Transfer Funds</p>
            <div class="input-box" @change="verifyTag(accountTag)">
                <label>Recepient Tag</label>
                <input v-model="accountTag" type="text" required>
            </div>
            <div class="input-box">
                <label>Recepient Info</label>
                <div class="fake-input">
                    <p v-if="!requestFailed" class="found-receipient">{{ foundUser?.lastname?.toUpperCase() }} {{ foundUser?.firstname?.toUpperCase() }}</p>
                    <p v-if="requestFailed" class="found-receipient error">INVALID ACCOUNT TAG</p>
                </div>
            </div>
            <p class="convert-currency">
                    {{ formatCurrency(Number(amount) || 0)}}
            </p>
            <div class="input-box">
                <label>Amount</label>
                <input v-model="amount" type="number" required :disabled="foundUser === undefined ? true : false">
            </div>
            <div class="input-box last-input">
                <label>Comment</label>
                <input v-model="comment" type="text" required :disabled="foundUser === undefined ? true : false">
            </div>
            <div class="call-to-action">
                <input v-if="!isLoading" type="submit" class="default-btn" value="CONTINUE" :disabled="amount == '' || accountTag == ''" @click="showPinModal = true">
                <button v-if="isLoading" class="default-btn">
                    <img class="btn-loader" src="@/assets/icons/loader.svg" alt="">
                </button>
            </div>
        </div>
        <div v-if="showPinModal == true" class="whole-modal">
            <div class="modal" data-aos="fade-up">
                <img src="@/assets/icons/arrow-left.svg" alt="Go back" @click="showPinModal = false">
                <p class="modal-name">Enter your pin</p>
                <div class="input-box">
                    <div class="pin-box">
                        <input v-model="digit_1" type="number" class="auto-input" required maxlength="1" @keydown="nextInput">
                        <input v-model="digit_2" type="number" class="auto-input" required maxlength="1">
                        <input v-model="digit_3" type="number" class="auto-input" required maxlength="1">
                        <input v-model="digit_4" type="number" class="auto-input" required maxlength="1">
                    </div>
                </div>
                <div class="call-to-action">
                    <input v-if="!isLoading" type="submit" class="default-btn" value="TRANSFER" :disabled="amount == '' || accountTag == ''" @click="transferFund()">
                    <button v-if="isLoading" class="default-btn">
                        <img class="btn-loader" src="@/assets/icons/loader.svg" alt="">
                    </button>
                </div>
            </div>
        </div>
        <div v-if="requestSent == true" class="transaction-status-modal" data-aos="fade-in">
            <div class="center">
                <div v-if="transactionDetails !== undefined && !isLoading && transactionDetails.status?.toLowerCase() == 'success'" class="status-box success">
                    <img src="@/assets/icons/success-status.svg" alt="Transaction successful" class="status-illustration">
                    <p class="status">
                        SUCCESSFUL
                    </p>
                    <p class="status-msg">
                        You just Transafered <span class="amount">{{ formatCurrency(transactionDetails.amount) }}</span> to {{transactionDetails.recepientTag }}.
                    </p>
                    <NuxtLink :to="`/dashboard/transaction-details/${transactionDetails.referenceId}`" class="view-receipt">VIEW RECEIPT</NuxtLink>
                </div>
                <div v-if="requestFailed == true && !isLoading" class="status-box failed">
                    <img src="@/assets/icons/failed-status.svg" alt="Transaction failed" class="status-illustration">
                    <p class="status">
                        {{ transactionError || 'REQUEST FAILED' }}
                    </p>
                    <p class="status-msg">
                        Your attempt to transfer funds has failed.
                    </p>
                </div>
                <img v-if="isLoading == true" src="@/assets/icons/loader.svg" alt="Loading">
            </div>
            <div v-if="!isLoading" class="call-to-action">
                <button class="default-btn" @click="closeStatusModal()">CLOSE
                    </button>
            </div>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    export default {
        props: {
            senderTag: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                amount: '',
                accountTag: '',
                comment: '',
                isLoading: false,
                foundUser: undefined,
                requestFailed: undefined,
                requestSent: false,
                showPinModal: false,
                digit_1: '',
                digit_2: '',
                digit_3: '',
                digit_4: '',
                transactionDetails: undefined,
                transactionError: '',
            }
        },
        methods: {
            formatCurrency(num) {
                return "₦" + num.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            },
            closeStatusModal() {
                this.requestSent = false;
                this.$emit('close-transfer-modal')
                window.location.reload()
            },
            clearInputs() {
                this.digit_1 = ''
                this.digit_2 = ''
                this.digit_3 = ''
                this.digit_4 = ''
                this.showPinModal = false;
                this.foundUser = {}
                this.accountTag = '';
                this.amount = '';
                this.comment = ''
            },
            transferFund() {
                this.isLoading = true
                this.requestSent = true
                this.$axios({
                    method: "POST",
                    url: "/wallet/transfer-fund",
                    data: {
                        amount: this.amount,
                        recipientAccountTag: this.accountTag,
                        comment: this.comment,
                        pin: this.digit_1 + this.digit_2 + this.digit_3 + this.digit_4,
                        senderTag: this.senderTag
                    },
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`
                    },
                }).then((onfulfilled) => {
                    this.isLoading = false;
                    this.clearInputs();
                    this.transactionDetails = onfulfilled.data.data
                    // this.$emit('close-transfer-modal');
                }).catch((onrejected) => {
                    this.isLoading = false;
                    this.clearInputs()
                    this.requestFailed = true
                    // this.$emit('close-transfer-modal'); 
                    if (typeof onrejected.response.data.message !== "string") {
                        for (const x in onrejected.response.data.message) {
                            this.$toast.error(onrejected.response.data.message[x]);
                        }
                    } else {
                        this.transactionError = onrejected.response.data.message
                        // this.$toast.error(onrejected.response.data.message);
                    }
                });
            },
            verifyTag(tag) {
                this.isLoading = true
                this.foundUser = undefined
                console.log(tag);
                this.$axios({
                    method: "POST",
                    url: "/user/profile/find-by-username",
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`,
                        'content-type': 'application/json',
                    },
                    data: {
                        accountTag: this.accountTag,
                    },
                }).then((onfulfilled) => {
                    this.isLoading = false
                    this.requestFailed = false
                    this.foundUser = onfulfilled.data.data
                }).catch((onrejected) => {
                    this.isLoading = false
                    this.requestFailed = true
                    this.fundWalletIsLoading = false;
                    if (typeof onrejected.response.data.message !== "string") {
                        for (const x in onrejected.response.data.message) {
                            this.$toast.error(onrejected.response.data.message[x]);
                        }
                    } else {
                        this.$toast.error(onrejected.response.data.message);
                    }
                });
            },
            nextInput() {
                const inputs = document.getElementsByClassName('auto-input')
                Array.from(inputs).forEach((inpt) => {
                    inpt.addEventListener('keyup', (event) => {
                        if (inpt.value.length === 1) {
                            inpt.nextElementSibling ?.focus()
                        }
                    })
                })
            },
        }
    }
</script>

<style scoped>
    .whole-modal {
        position: fixed;
        height: 100vh;
        width: 100%;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(2px);
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .modal {
        min-height: 40vh;
        position: absolute;
        bottom: 0;
        background: white;
        width: 100%;
        padding: 25px;
        border-radius: 16px 16px 0 0;
        transition-delay: 1s;
        transition: all 1s ease-in-out;
    }
    .transaction-status-modal {
        position: fixed;
        height: 100vh;
        width: 100%;
        z-index: 10;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: white;
    }
    .center {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .status-box {
        width: 100%;
        text-align: center;
        /* margin-top: 20vh; */
    }
    .status-illustration {
        /* margin-bottom: 25px; */
    }
    .status {
        font-weight: 600;
        font-size: 18px;
        margin-bottom: 10px;
    }
    .status-msg {
        font-weight: 400;
        font-size: 14px;
        margin-bottom: 15px;
        width: 70%;
        margin: auto;
    }
    .amount {
        font-weight: 600;
        color: green;
    }
    .view-receipt {
        margin-top: 10px;
        text-decoration: underline;
        color: #EBB3FF;
    }
    /* .swipeModalDown {
            bottom: -999px;
        } */
    .modal-name {
        font-weight: 600;
        font-size: 16px;
        margin: 15px 0 25px;
    }
    .input-box {
        display: flex;
        flex-direction: column;
        margin-bottom: 25px;
    }
    .input-box label {
        font-size: 15px;
        font-size: 500;
        margin-bottom: 8px;
    }
    .convert-currency{
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 5px;
    }
    .pin-box {
        display: flex;
        width: 100%;
        justify-content: center;
        column-gap: 20px;
    }
    .pin-box input {
        width: 60px;
        height: 60px;
        border-radius: 8px;
        border: 1px solid #DFDFDF;
        font-size: 25px;
        text-align: center;
    }
    .last-input {
        margin-bottom: 10vh;
    }
    .input-box input,
    .fake-input {
        width: 100%;
        height: 56px;
        border: 1px solid #DFDFDF;
        border-radius: 8px;
        padding-left: 10px;
        font-size: 18px;
    }
    .fake-input {
        background: whitesmoke;
        display: flex;
        align-items: center;
    }
    .found-receipient {
        color: gray;
        font-size: 16px;
        font-weight: 600;
    }
    .found-receipient.error {
        color: red;
    }
    .input-box input:focus {
        outline: none;
        border: 1px solid gray;
    }
    .call-to-action {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
    }
    .call-to-action .default-btn {
        /* background: black; */
        background: #EBB3FF;
        color: black;
        border-radius: 8px;
        /* color: white; */
        font-size: 20px;
        font-weight: 500;
        height: 55px;
        border: 0;
        width: 90%;
        cursor: pointer;
        margin-bottom: 4vh;
    }
    .default-btn:disabled {
        /* background: rgb(36, 35, 35); */
        cursor: not-allowed;
    }
</style>