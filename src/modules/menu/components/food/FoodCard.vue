<template>
    <div class="food-item">
        <div class="menu-item-title">
            <img style="width: 150px" :src="food?.foodImg?.url" alt="" />
            <h3>{{ food.foodName }}</h3>
        </div>
        <div class="menu-item-price">{{ parseMoney(food.price) }}</div>
    </div>
</template>

<script lang="ts">
import { mixins, Options, Prop } from 'vue-property-decorator';

import { MenuMixins } from '../../mixins';
import { Delete as DeleteIcon, Edit as EditIcon } from '@element-plus/icons-vue';
import { IFood } from '../../types';

@Options({
    name: 'food-card-component',
    components: {
        DeleteIcon,
        EditIcon,
    },
})
export default class FoodCard extends mixins(MenuMixins) {
    @Prop({ default: '' }) readonly food!: IFood;
}
</script>

<style lang="scss" scoped>
.food-item:hover .menu-item-price {
    color: var(--white);
}

.food-item {
    width: 46%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 2%;
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
