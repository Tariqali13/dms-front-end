<template>
    <div class="row flex w-full justify-between items-center">
        <div class="col-sm my-1 w-full flex justify-start items-center gap-2">
            <div class="min-h-[22px] min-w-[22px] lg:min-h-[32px] lg:min-w-[32px] flex rounded-full pl-[5px] pt-[5px] pr-1 pb-1"
                :style="{ backgroundColor: wallet_color }">
                <img src="/svg-icons/money-icon.svg" alt="My SVG Icon"
                    class="lg:w-[23px] lg:h-[23px] sm:w-[13px] sm:h-[13px]" />
            </div>
            <span class="w-max font-semibold font-['Inter'] lg:text-base md:text-sm sm:text-sm">{{ wallet_name }}</span>
        </div>
        <span
            class="col-sm w-max sm:text-left md:text-left lg:text-right lg:text-base md:text-sm sm:text-sm font-semibold font-['Inter']">{{
                getCurrencySymbol(wallet_currency) }} {{ wallet_value.toFixed(2)
            }}</span>
    </div>
</template>

<script>
import { currencies } from '../../constants/currencies';  // Adjust the path according to your project structure

export default {

    data() {
        return {
            currencies,  // Assign the imported currencies to the component's data
        };
    },
    methods: {
        getCurrencySymbol(currencyCode) {
            const currency = this.currencies.find((c) => c.code === currencyCode);
            return currency ? currency.symbol : ''; // Return symbol if found, else empty string
        },
    },
    props: {
        wallet_currency: {
            type: String,
            required: true
        },
        wallet_name: {
            type: String,
            required: true
        },
        wallet_value: {
            type: String,
            required: true,
        },
        wallet_color: {
            type: String,
            required: true,
        },
    },
}
</script>