<template>
    <div class="whole-container">
        <div class="user-intro">
            <img class="user-photo" :src="userDetails?.photo" alt="">
            <div class="user-intro-text">
                <p class="greeting">@{{ userDetails?.username}}</p>
            </div>
        </div>
        <div data-aos="fade-in" class="balance-card">
            <div class="card-details">
                <p class="title">Available Balance</p>
                <p class="wallet-balance">{{ formatCurrency(walletBalance) }}</p>  
            </div>
        </div>
        <div data-aos="fade-in" class="account-actions">
            <div class="action-item" @click="showTransferModal = true">
                <div class="icon-box">
                   <img src="@/assets/icons/transfer.svg" class="transfer" alt="Transfer funds">
                </div>
                <p>Transfer</p>
            </div>
            <div class="action-item" @click="showFundModal = true">
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
        <!-- {{ userDetails }} -->
        <div class="recent-transactons">
            <div class="transaction-head-box">
                <p>Recent Transactions</p>
            </div>
            <!-- {{ transactions }} -->
            <div v-if="transactions.length >= 1" class="transactions">
                <div v-for="transaction in transactions" :key="transaction._id" class="transaction-card">
                    <div class="lhs">
                        <img v-if="transaction.transactionType == 'Fund' || transaction.transactionType == 'Fund wallet'" src="@/assets/icons/fund.svg" alt="Fund your RavePay wallet" class="card-icon fund">
                        <img v-if="transaction.transactionType == 'Withdrawal'" src="@/assets/icons/withdraw.svg" alt="Withdraw from your RavePay wallet" class="card-icon withdraw">
                        <img v-if="transaction.transactionType == 'Transfer'" src="@/assets/icons/transfer.svg" alt="Transfer funds" class="card-icon transfer"> 
                        <div v-if="transaction.transactionType == 'Transfer'" class="details">
                            <p class="action">Transfer</p>
                            <p class="action-info">Funds sent to @heyTope</p>
                        </div>
                        <div v-if="transaction.transactionType == 'Withdrawal'" class="details">
                            <p class="action">Withdraw</p>
                            <p class="action-info">{{transaction.comment.slice(0, 50) }}</p>
                        </div>
                        <div v-if="transaction.transactionType == 'Fund' || transaction.transactionType == 'Fund wallet'" class="details">
                            <p class="action">Fund Wallet</p>
                            <p v-if="transaction.status.toLowerCase() == 'success'" class="action-info">Wallet has been funded</p>
                            <p v-if="transaction.status.toLowerCase() == 'abandoned'" class="action-info">Transaction checkout abandoned</p>
                            <p v-if="transaction.status.toLowerCase() == 'failed'" class="action-info">Transaction failed</p>
                            <p v-if="transaction.status.toLowerCase() == 'pending'" class="action-info">Unprocessed transaction</p>
                        </div>
                    </div>
                    <p v-if="transaction.operationType == 'Debit' && transaction.fundOriginatorAccount == userDetails?._id" class="transaction-amount debit">-{{formatCurrency(transaction.amount)}}</p>
                    <p v-if="transaction.operationType == 'Debit' && transaction.fundRecipientAccount == userDetails?._id" class="transaction-amount credit">+{{formatCurrency(transaction.amount)}}</p>
                    <p v-if="transaction.operationType == 'Credit' && transaction.fundRecipientAccount == userDetails?._id" class="transaction-amount credit">+{{formatCurrency(transaction.amount)}}</p>
                </div>
            </div>
            <div v-if="transactions.length < 1" class="empty-transactions">
                <h3>NO TRANSACTIONS FOUND</h3>
            </div>
        </div>
        <FundAccountModal v-if="showFundModal" @close-fund-wallet="showFundModal = false" @fund-wallet="fundWallet($event)"/>
        <TransferFundsModal v-if="showTransferModal" @close-transfer-modal="showTransferModal = false"/>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
import FundAccountModal from '~/components/FundAccountModal.vue';
import TransferFundsModal from '~/components/TransferFundsModal.vue';
    export default {
    components: { FundAccountModal, TransferFundsModal },
    layout: 'defaultLayout',
    data() {
        return {
            transactions: [],
            userDetails: {},
            isLoading: true,
            walletBalance: 0,
            walletBalanceLoading: true,
            transactionIsLoading: true,
            fundWalletIsLoading: false,
            showFundModal: false,
            showTransferModal: false,
        };
    },
    mounted() {
        this.checkCookie();
        if (Cookies.get('token') !== undefined) {
            this.getUserDetails();
            this.getWalletBalance();
            this.getTransactionHistory();
        }
    },
    methods: {
        checkCookie () {
            if (Cookies.get('token') === undefined) {
                this.$router.push('/login')
                this.$toasted.error('Your session has expired')
            }
        },
        formatCurrency(num) {
            return "₦" + num.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        },
        getUserDetails() {
            this.isLoading = true;
            this.$axios({
                method: "GET",
                url: "/user/profile/me",
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                },
            }).then((onfulfilled) => {
                this.isLoading = false;
                this.userDetails = onfulfilled.data.data;
            }).catch((onrejected) => {
                this.isLoading = false;
                if (typeof onrejected.response.data.message !== "string") {
                    for (const x in onrejected.response.data.message) {
                        this.$toast.error(onrejected.response.data.message[x]);
                    }
                }
                else {
                    this.$toast.error(onrejected.response.data.message);
                }
            });
        },
        getWalletBalance() {
            this.walletBalanceLoading = true;
            this.$axios({
                method: "GET",
                url: "/wallet/balance",
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                },
            }).then((onfulfilled) => {
                this.walletBalanceLoading = false;
                this.walletBalance = onfulfilled.data.data.balance;
            }).catch((onrejected) => {
                this.walletBalanceLoading = false;
                if (typeof onrejected.response.data.message !== "string") {
                    for (const x in onrejected.response.data.message) {
                        this.$toast.error(onrejected.response.data.message[x]);
                    }
                }
                else {
                    this.$toast.error(onrejected.response.data.message);
                }
            });
        },
        getTransactionHistory() {
            this.transactionIsLoading = true;
            this.$axios({
                method: "GET",
                url: "/wallet/transaction-history",
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                },
            }).then((onfulfilled) => {
                this.transactionIsLoading = false;
                this.transactions = onfulfilled.data.data;
            }).catch((onrejected) => {
                this.walletBalanceLoading = false;
                if (typeof onrejected.response.data.message !== "string") {
                    for (const x in onrejected.response.data.message) {
                        this.$toast.error(onrejected.response.data.message[x]);
                    }
                }
                else {
                    this.$toast.error(onrejected.response.data.message);
                }
            });
        },
        fundWallet(amount) {
            this.fundWalletIsLoading = true;
            this.$axios({
                method: "POST",
                url: "/wallet/fund",
                data: {
                    amount,
                },
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                },
            }).then((onfulfilled) => {
                this.showFundModal = false
                this.fundWalletIsLoading = false;
                this.redirectSocial(onfulfilled.data.data.authorization_url)
            }).catch((onrejected) => {
                this.fundWalletIsLoading = false;
                if (typeof onrejected.response.data.message !== "string") {
                    for (const x in onrejected.response.data.message) {
                        this.$toast.error(onrejected.response.data.message[x]);
                    }
                }
                else {
                    this.$toast.error(onrejected.response.data.message);
                }
            });
        },
        // transferFund({amount, accountTag, comment}) {
        //     this.$axios({
        //         method: "POST",
        //         url: "/wallet/transfer-fund",
        //         data: {
        //             amount,
        //             accountTag,
        //             comment
        //         },
        //         headers: {
        //             Authorization: `Bearer ${Cookies.get("token")}`
        //         },
        //     }).then((onfulfilled) => {
        //         this.showTransferModal = false
        //     }).catch((onrejected) => {
        //         this.fundWalletIsLoading = false;
        //         if (typeof onrejected.response.data.message !== "string") {
        //             for (const x in onrejected.response.data.message) {
        //                 this.$toast.error(onrejected.response.data.message[x]);
        //             }
        //         }
        //         else {
        //             this.$toast.error(onrejected.response.data.message);
        //         }
        //     });
        // },
        // verifyTag(tag) {
        //     console.log(tag);
        //     // this.fundWalletIsLoading = true;
        //     this.$axios({
        //         method: "POST",
        //         url: "/user/profile/find-by-username",
        //         headers: {
        //             Authorization: `Bearer ${Cookies.get("token")}`,
        //             'content-type': 'application/json',
        //         },
        //         data: {
        //             accountTag: tag,
        //         },
        //     }).then((onfulfilled) => {
        //         // this.showTransferModal = false
        //         // this.fundWalletIsLoading = false;
        //         this.foundUser = onfulfilled.data.data
        //     }).catch((onrejected) => {
        //         this.fundWalletIsLoading = false;
        //         if (typeof onrejected.response.data.message !== "string") {
        //             for (const x in onrejected.response.data.message) {
        //                 this.$toast.error(onrejected.response.data.message[x]);
        //             }
        //         }
        //         else {
        //             this.$toast.error(onrejected.response.data.message);
        //         }
        //     });
        // },
        redirectSocial (url) {
            window.location.replace(url);
            // window.open(url, '_blank');
        }
    }
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
    margin-left: 10px;
    display: flex;
    align-items: center;
}
.user-intro-text p{
    font-size: 16px;
    font-weight: 600;
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
    padding-bottom: 10px;
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
    position: relative;
    width: 100%;
    /* background: #F7F7F7; */
    background: whitesmoke;
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
    font-size: 13px;
}
.transaction-amount{
    font-size: 16px;
    font-weight: 500;
    background: whitesmoke;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    right: 30px;
}
.transaction-amount.debit{
    color: red;
}
.transaction-amount.credit{
    color: green;
}
</style>