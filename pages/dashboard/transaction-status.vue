<template>
    <div class="whole-container">
        <div class="center">
          <div v-if="!isLoading && transactionDetails.status?.toLowerCase() == 'success'" class="status-box success">
            <img src="@/assets/icons/success-status.svg" alt="Transaction successful" class="status-illustration">
            <p class="status">
                SUCCESSFUL
            </p>
            <p class="status-msg">
                You just added <span class="amount">{{ transactionDetails.amount }}</span> to your wallet.
            </p>
            <NuxtLink to="#" class="view-receipt">VIEW RECEIPT</NuxtLink>
        </div>
        <div v-if="!isLoading && transactionDetails.status?.toLowerCase() == 'failed' || transactionDetails.status?.toLowerCase() == 'abandoned'" class="status-box failed">
            <img src="@/assets/icons/failed-status.svg" alt="Transaction failed" class="status-illustration">
            <p class="status">
                FAILED
            </p>
            <p class="status-msg">
                Your attempt to fund your account has failed.
            </p>
        </div>
        <div v-if="requestFailed == true && !isLoading" class="status-box failed">
            <img src="@/assets/icons/failed-status.svg" alt="Transaction failed" class="status-illustration">
            <p class="status">
                FAILED
            </p>
            <p class="status-msg">
                Your attempt to fund your account has failed.
            </p>
        </div>
        <img v-if="isLoading == true" src="@/assets/icons/loader.svg" alt="Loading">  
        </div>
        
        <div class="call-to-action">
            <NuxtLink to="/dashboard">
                <button class="default-btn">FUND AGAIN
                </button>
            </NuxtLink>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    export default {
        layout: 'defaultLayout',
        data(){
            return {
                reference: this.$route.query.reference,
                isLoading: true,
                requestFailed: false,
                transactionDetails: {},
            }
        },
        mounted(){
            this.checkCookie();
             if (Cookies.get('token') !== undefined) {
                this.verifyTransaction();
             }
        },
        methods: {
            checkCookie () {
                if (Cookies.get('token') === undefined) {
                    this.$router.push('/login')
                    this.$toasted.error('Your session has expired')
                }
            },
            verifyTransaction(){
                this.isLoading = true;
            this.$axios({
                method: "GET",
                url: `/wallet/verify-transaction?reference=${this.reference}`,
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                    'content-type': 'application/json',
                },
            }).then((onfulfilled) => {
                this.isLoading = false;
                this.transactionDetails = onfulfilled.data.data;
            }).catch((onrejected) => {
                this.requestFailed = true;
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
            }
        }
    }
</script>

<style scoped>
.whole-container{
    /* position: relative; */
    height: 100vh;
    width: 100%;
}
.center{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.status-box{
    width: 100%;
    text-align: center;
    /* margin-top: 20vh; */
}
.status-illustration{
    /* margin-bottom: 25px; */
}
.status{
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 10px;
}
.status-msg{
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 15px;
    width: 60%;
    margin: auto;
}
.amount{
    font-weight: 600;
    color: green;
}
.call-to-action{
    position: absolute;
    bottom: 3vh;
    left: 0;
    right: 0;
    text-align: center;
}
.call-to-action .default-btn{
     background: #EBB3FF;
    border-radius: 8px;
    color: black;
    font-size: 20px;
    font-weight: 500;
    height: 55px;
    border: 0;
    width: 90%;
    cursor: pointer;
}
.view-receipt{
    text-decoration: underline;
    color: #EBB3FF;
}
</style>