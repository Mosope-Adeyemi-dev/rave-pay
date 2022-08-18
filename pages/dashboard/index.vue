<template>
    <div class="whole-container">
        <div class="user-intro">
            <img class="user-photo" src="https://avatars.githubusercontent.com/u/78312219?v=4" alt="">
            <div class="user-intro-text">
                <p class="greeting">Hello James</p>
                <p class="welcome-text">Welcome back 👋</p>
            </div>
        </div>
        <div class="balance-card">
            <div class="card-details">
                <p class="title">Available Balance</p>
                <p class="wallet-balance">{{ formatCurrency(8520) }}</p>  
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
            <p>Recent Transactions</p>
            <div class="transactions">
                <div class="transaction-card">
                    <img src="@/assets/icons/transfer.svg" alt="Transfer funds">
                    <img src="@/assets/icons/fund.svg" alt="Fund your RavePay wallet">
                    <img src="@/assets/icons/withdraw.svg" alt="Withdraw from your RavePay wallet">
                    <div class="details">
                        <p class="action">Transfer</p>
                        <p class="action-info">Funds sent to @heyTope</p>

                        <p class="action">Withdraw</p>
                        <p class="action-info">Funds sent to Firstbank 114</p>

                        <p class="action">Fund Wallet</p>
                        <p class="action-info">Funds added to your wallet</p>
                    </div>
                    <p class="amount debit">-{{formatCurrency(850)}}</p>
                    <p class="amount credit">+{{formatCurrency(850)}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            formatCurrency (num){
                return '₦'+ num.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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
    width: 90%;
    margin: auto;
    display: flex;
    align-content: center;
}
.user-photo{
    width: 45px;
    height: 45px;
    border-radius: 25px;
    display: flex;
    background: red;
}
.user-intro-text{
    margin-left: 24px;
}
.welcome-text{
    font-size: 20px;
    font-weight: 500;
}
.balance-card{
    position: relative;
    width: 85%;
    margin: 50px auto 0 ;
    height: 150px;
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
    font-size: 32px;
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
.icon-box img.transfer{
    background: #EBB2FF;
}
.icon-box img.fund{
    background: #A7FED9;
}
.icon-box img.withdraw{
    background: #93B9FF;
}
</style>