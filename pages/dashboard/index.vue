<template>
    <div class="whole-container">
        <div class="user-intro">
            <img class="user-photo" :src="userDetails?.photo" alt="">
            <div class="user-intro-text">
                <p class="greeting">Hello {{ userDetails?.firstname}}</p>
                <p class="welcome-text">Welcome back 👋</p>
            </div>
        </div>
        <div class="balance-card">
            <div class="card-details">
                <p class="title">Available Balance</p>
                <p v-if="!walletBalanceLoading" class="wallet-balance">{{ formatCurrency(walletBalance) }}</p>  
            </div>
        </div>
        <div class="account-actions">
            <div class="action-item">
                <div class="icon-box">
                   <img src="@/assets/icons/transfer.svg" class="transfer" alt="Transfer funds">
                </div>
                <p>Transfer</p>
            </div>
            <div class="action-item">
                <div class="icon-box">
                   <img src="@/assets/icons/fund.svg" class="fund" alt="Fund your RavePay wallet"> 
                </div>
                <p>Fund</p>
            </div>
            <div class="action-item">
                <div class="icon-box">
                   <img src="@/assets/icons/withdraw.svg" class="withdraw" alt="Withdraw from your RavePay wallet">
                </div>
                <p>Withdraw</p>
            </div>
        </div>
        <div class="recent-transactons">
            <div class="transaction-head-box">
                <p>Recent Transactions</p>
            </div>
            <div v-if="transactions.length > 1" class="transactions">
                <div v-for="transaction in transactions" :key="transaction._id" class="transaction-card">
                    <div class="lhs">
                        <img v-if="transaction.transactionType == 'Fund' || transaction.transactionType == 'Fund wallet'" src="@/assets/icons/fund.svg" alt="Fund your RavePay wallet" class="card-icon fund">
                        <img v-if="transaction.transactionType == 'Withdrawal'" src="@/assets/icons/withdraw.svg" alt="Withdraw from your RavePay wallet">
                        <img v-if="transaction.transactionType == 'Transfer'" src="@/assets/icons/transfer.svg" alt="Transfer funds" class="card-icon transfer"> 
                        <div v-if="transaction.transactionType == 'Transfer'" class="details">
                            <p class="action">Transfer</p>
                            <p class="action-info">Funds sent to @heyTope</p>
                        </div>
                        <div v-if="transaction.transactionType == 'Withdrawal'" class="details">
                            <p class="action">Withdraw</p>
                            <p class="action-info">Funds sent to Firstbank 114</p>
                        </div>
                        <div v-if="transaction.transactionType == 'Fund' || transaction.transactionType == 'Fund wallet'" class="details">
                            <p class="action">Fund Wallet</p>
                            <p class="action-info">Funds added to your wallet</p>
                        </div>
                    </div>
                    
                    <p class="amount debit">-{{formatCurrency(850)}}</p>
                    <!-- <p class="amount credit">+{{formatCurrency(850)}}</p> -->
                </div>
            </div>
            <div v-if="transactions.length < 1" class="empty-transactions">
                <h3>NO TRANSACTIONS FOUND</h3>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
    export default {
        data (){
            return {
                transactions: [
                    {
            "_id": "62dfa8683ed34c033b32958b",
            "transactionType": "Fund wallet",
            "accessCode": "hu1neo9c9vyv58s",
            "operationType": "Credit",
            "fundOriginatorAccount": "62dfa7c03ed34c033b329586",
            "status": "success",
            "amount": 3000,
            "referenceId": "a366a360-725c-45d7-bc18-faea94298b2d",
            "createdAt": "2022-07-26T08:40:08.717Z",
            "updatedAt": "2022-07-27T22:51:27.689Z",
            "__v": 0,
            "processingFees": 3869.850000000006
        },
        {
            "processingFees": 0,
            "_id": "62dfa9c2728ce8c747426348",
            "transactionType": "Fund wallet",
            "accessCode": "ti20ydwcrkb8aku",
            "operationType": "Credit",
            "fundOriginatorAccount": "62dfa7c03ed34c033b329586",
            "status": "success",
            "amount": 3000,
            "referenceId": "2b930343-8033-49ed-b3a1-8b20462c6a6d",
            "createdAt": "2022-07-26T08:45:54.058Z",
            "updatedAt": "2022-07-26T12:07:53.532Z",
            "__v": 0
        },
        {
            "_id": "62e1af6b5f881159829ac0ba",
            "transactionType": "Fund wallet",
            "accessCode": "jknislzgfe80ynx",
            "operationType": "Credit",
            "fundOriginatorAccount": "62dfa7c03ed34c033b329586",
            "status": "success",
            "amount": 1500,
            "referenceId": "dda425e0-5bc7-4a06-9810-6929d2303c66",
            "createdAt": "2022-07-27T21:34:35.675Z",
            "updatedAt": "2022-07-27T23:24:50.449Z",
            "__v": 0,
            "processingFees": 3869.850000000006,
            "authorization": {
                "authorization_code": "AUTH_fdtrrfjnli",
                "bin": "408408",
                "last4": "4081",
                "exp_month": "12",
                "exp_year": "2030",
                "channel": "card",
                "card_type": "visa ",
                "bank": "TEST BANK",
                "country_code": "NG",
                "brand": "visa",
                "reusable": true,
                "signature": "SIG_QihE69ThObG0PVrAkPGQ",
                "account_name": null
            }
        },
        {
            "_id": "62f17086b199c677194123c9",
            "transactionType": "Fund",
            "accessCode": "dmetx36kar0etuu",
            "operationType": "Credit",
            "fundRecipientAccount": "62dfa7c03ed34c033b329586",
            "status": "success",
            "processingFees": 5664.510000000009,
            "amount": 2200,
            "referenceId": "3341bb64-3c74-4672-b699-80f692e3cd4d",
            "createdAt": "2022-08-08T20:22:30.508Z",
            "updatedAt": "2022-08-08T20:26:30.837Z",
            "__v": 0,
            "authorization": {
                "authorization_code": "AUTH_h1svhgo2jx",
                "bin": "408408",
                "last4": "4081",
                "exp_month": "12",
                "exp_year": "2030",
                "channel": "card",
                "card_type": "visa ",
                "bank": "TEST BANK",
                "country_code": "NG",
                "brand": "visa",
                "reusable": true,
                "signature": "SIG_QihE69ThObG0PVrAkPGQ",
                "account_name": null
            }
        },
        {
            "_id": "62f175836f1ca22473e01078",
            "transactionType": "Fund",
            "accessCode": "h1rkc4ayrtdmvlc",
            "operationType": "Credit",
            "fundRecipientAccount": "62dfa7c03ed34c033b329586",
            "status": "success",
            "processingFees": 23959.719999999972,
            "amount": 5300,
            "referenceId": "baad45c2-7ec5-4efb-a736-ed0e58ac1621",
            "createdAt": "2022-08-08T20:43:47.390Z",
            "updatedAt": "2022-08-08T20:44:47.389Z",
            "__v": 0,
            "authorization": {
                "authorization_code": "AUTH_efbjzb0p7e",
                "bin": "408408",
                "last4": "4081",
                "exp_month": "12",
                "exp_year": "2030",
                "channel": "card",
                "card_type": "visa ",
                "bank": "TEST BANK",
                "country_code": "NG",
                "brand": "visa",
                "reusable": true,
                "signature": "SIG_QihE69ThObG0PVrAkPGQ",
                "account_name": null
            },
        },
        {
            "_id": "62f17ed7557b2d59aa530799",
            "transactionType": "Transfer",
            "operationType": "Debit",
            "fundRecipientAccount": "62dfa7b23ed34c033b329584",
            "fundOriginatorAccount": "62dfa7c03ed34c033b329586",
            "status": "Success",
            "processingFees": 0,
            "amount": 2000,
            "referenceId": "228e9ee5-8911-43b1-9739-5381c662477d",
            "comment": "Enjoy the urgent 2k boss",
            "createdAt": "2022-08-08T21:23:35.498Z",
            "updatedAt": "2022-08-08T21:23:35.498Z",
            "__v": 0
        }
                ],
                userDetails: {},
                isLoading: true,
                walletBalance: '0',
                walletBalanceLoading: true,
            }
        },
        mounted(){
            this.getUserDetails();
            this.getWalletBalance();
        },
        methods: {
            formatCurrency (num){
                return '₦'+ num.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            },
            getUserDetails() {
                this.isLoading = true;
                this.$axios({
                    method: 'GET',
                    url: '/user/profile/me',
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`
                    },
                }).then((onfulfilled) => {
                    this.isLoading = false
                    this.userDetails = onfulfilled.data.data;
                }).catch((onrejected) => {
                    this.isLoading = false
                    if  (typeof onrejected.response.data.message !== 'string'){
                    for (const x in onrejected.response.data.message){
                        this.$toast.error(onrejected.response.data.message[x]);
                    }
                    }  else {
                        this.$toast.error(onrejected.response.data.message);
                    }
                })
            },
            getWalletBalance() {
                this.walletBalanceLoading = true;
                this.$axios({
                    method: 'GET',
                    url: '/wallet/balance',
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`
                    },
                }).then((onfulfilled) => {
                    this.walletBalanceLoading = false
                    this.walletBalance = onfulfilled.data.data.balance;
                }).catch((onrejected) => {
                    this.walletBalanceLoading = false
                    if  (typeof onrejected.response.data.message !== 'string'){
                    for (const x in onrejected.response.data.message){
                        this.$toast.error(onrejected.response.data.message[x]);
                    }
                    }  else {
                        this.$toast.error(onrejected.response.data.message);
                    }
                })
            }
        },
    }
</script>

<style scoped>
.whole-container{
    height: 100vh;
    width: 100%;
    /* background: black; */
    padding-top: 20px;
}
.user-intro{
    width: 100%;
    padding: 0 20px 15px;
    margin: auto;
    display: flex;
    align-content: center;
}
.user-photo{
    width: 45px;
    height: 45px;
    border-radius: 25px;
    display: flex;
    background: whitesmoke;
    border: lightgray;
}
.user-intro-text{
    margin-left: 24px;
}
.welcome-text{
    font-size: 18px;
    font-weight: 500;
}
.balance-card{
    position: relative;
    width: 85%;
    margin: 30px auto 0 ;
    height: 150px;
    border: 1px solid #DFDFDF;
    background-image: url('@/assets/images/balance-card-bg.png');
    background-position: top right;
    background-repeat: no-repeat;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.071);
    border-radius: 16px;
}
.card-details{
    position: absolute;
    /* background: red; */
    top: auto;
    bottom: 10px;
    left: 20px;
    right: 20px;
}
.card-details .title{
    font-weight: 400;
    color: #1D1D21;
    font-size: 15px;
    margin-bottom: 5px;
}
.card-details .wallet-balance{
    font-weight: 600;
    color: #1D1D21;
    font-size: 35px;
}
.account-actions{
    width: 65%;
    margin: 30px auto;
    display: flex;
    justify-content: space-between;
}
.account-actions .action-item{
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.action-item p{
    font-weight: 500;
    font-size: 16px;
    margin-top: 10px;
}
.icon-box{
    height: 70px;
    width: 70px;
    border-radius: 16px;
    border: 1px solid lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
    /* box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.071); */
}
.icon-box img{
    border-radius: 20px;
    width: 45px;
    padding: 5px;
}
.card-icon{
    padding: 5px;
    width: 35px;
    height: 35px;
    border-radius: 30px;
    margin-right: 20px;
}
.icon-box img.transfer, .card-icon.transfer{
    background: #EBB2FF;
}
.icon-box img.fund, .card-icon.fund{
    background: #A7FED9;
}
.icon-box img.withdraw, .card-icon.withdraw{
    background: #93B9FF;
}
.recent-transactons{
    /* background: red; */
    height: 50vh;
    border-top: 1px solid #F7F7F7;
    position: relative;
}
.transaction-head-box{
    height: 55px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 20px;
}
.transaction-head-box p{
    font-size: 18px;
    font-weight: 500;
}
.transactions{
    padding-top: 10px;
    height: 45.2vh;
    /* background: red; */
    overflow-y: auto;
}
.empty-transactions{
    height: 45.2vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.transaction-card{
    width: 100%;
    background: #F7F7F7;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    margin-bottom: 20px;
}
.lhs{
    display: flex;
    align-items: center;
}
.lhs .details .action{
    font-weight: 500;
    font-size: 16px;
}
.lhs .details .action-info{
    font-weight: 400;
    font-size: 12px;
}
</style>