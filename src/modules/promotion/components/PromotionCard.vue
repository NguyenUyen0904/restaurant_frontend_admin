<template>
    <div class="promotion-item d-flex flex-row">
        <div class="d-flex flex-row">
            <img style="width: 120px" :src="require(`../../../assets/images/bg.jpg`)" />
            <div class="menu-item-title d-flex flex-column ms-3 justify-content-center">
                <h3 class="fw-bold">{{ promotion.name }}</h3>
                <h4>{{ promotion.note }}</h4>
            </div>
        </div>
        <div class="menu-item-price">{{ promotion?.percent || 0 }}%</div>
    </div>
</template>

<script lang="ts">
import { mixins, Options, Prop } from 'vue-property-decorator';

import { Delete as DeleteIcon, Edit as EditIcon } from '@element-plus/icons-vue';
import { UtilMixins } from '@/mixins/utilMixins';
import { IPromotion } from '../types';

@Options({
    name: 'food-card-component',
    components: {
        DeleteIcon,
        EditIcon,
    },
})
export default class PromotionCard extends mixins(UtilMixins) {
    @Prop({ default: '' }) readonly promotion!: IPromotion;
}
</script>

<style lang="scss" scoped>
.promotion-item:hover .menu-item-price {
    color: var(--white);
}

.promotion-item {
    width: 30%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 1%;
    background: #e1e1e1;
    border-radius: 10px;
    padding: 10px;
    color: #000000;
    font-weight: 700 !important;
    .menu-item-title {
        display: flex;
        align-items: center;
        img {
            max-width: 100x;
            margin-right: 15px;
        }
        h3 {
            font-size: 16px;
            transition: all 0.5s ease;
            text-transform: capitalize;
        }
    }

    .menu-item-price {
        font-size: 16px;
        color: var(--main-color);
        transition: all 0.5s ease;
    }
}
</style>
