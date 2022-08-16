<template>
    <div class="main-container-layout">
        <header class="header">
            <div class="container-layout">
                <!-- <div class="logo-img">
                    <a href="#"
                        ><img
                            width="50"
                            src="../assets/images/Logo1.jpg"
                            alt="Ảnh Logo"
                    /></a>
                </div> -->

                <!-- <button class="nav-toggler">
                    <span> </span>
                </button> -->
            </div>
        </header>
        <!--Header - end-->
        <section class="home-section" id="home">
            <div class="home-section-bg"></div>
            <div class="container-layout">
                <div class="row-layout min-h-100">
                    <div class="home-text">
                        <h1>Nhà hàng DATN</h1>
                        <p>Lưu luyến trong từng hương vị</p>
                        <a href="#Order" class="button">Đặt bàn</a>
                    </div>
                </div>
            </div>
        </section>
        <!-- Home Section begin -->
        <!-- About-Section-begin -->
        <section class="about-section section-padding" id="about">
            <div class="container-layout">
                <div class="row-layout">
                    <div class="section-title">
                        <h2 data-title="our story">about us</h2>
                    </div>
                </div>
                <div class="row-layout">
                    <div class="about-text">
                        <h3>Chào mừng các bạn đến với DATN</h3>
                        <p>
                            Một nhà hàng nổi tiếng với những món ăn tuyệt vời, gắn liền
                            với tên tuổi của những đầu bếp nổi tiếng nhất Việt Nam!
                        </p>
                        <p>
                            Chúng tôi cam kết mang đến cho khách hàng sự trải nghiệm hài
                            lòng bởi dịch vụ hiện đai, món ăn tươi ngon, và bằng chính sự
                            chuyên nghiệp của chúng tôi.
                        </p>
                        <a href="#Menu" class="button">Xem menu</a>
                    </div>
                    <div class="about-img">
                        <div class="img-box">
                            <h2>10 + Year Experence</h2>
                            <img src="../assets/images/about.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- About-Section-end -->

        <!-- Menu-Section-begin -->
        <section class="menu-section section-padding" id="Menu">
            <div class="container-layout">
                <div class="row-layout">
                    <div class="section-title">
                        <h2 data-title="order now">our menu</h2>
                    </div>
                </div>
                <div class="row-layout">
                    <div class="menu-taps">
                        <el-scrollbar>
                            <button
                                type="button"
                                class="menu-tap-item"
                                :class="
                                    item.value === selectedCategory?.id ? 'active' : ''
                                "
                                data-target="#Dinner"
                                @click="changeCategory(item.value)"
                                v-for="item in categoryOptions"
                                :key="item.value"
                            >
                                {{ item.label }}
                            </button>
                        </el-scrollbar>
                        <div class="row">
                            <FoodCard
                                v-for="item in foodList"
                                :key="item.id"
                                :food="item"
                                class="col-6"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Menu-Section-end -->

        <!-- Promotion-Section-start -->
        <section class="promotion-section section-padding">
            <div class="container-layout">
                <div class="row-layout">
                    <div class="section-title">
                        <h2 data-title="promotion"></h2>
                    </div>
                </div>
                <div class="row-layout">
                    <div class="menu-taps">
                        <div class="row">
                            <PromotionCard
                                v-for="item in promotionList"
                                :key="item.id"
                                :promotion="item"
                                class="col-4"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Promotion-Section-end -->

        <!-- Testimonis-Section -->
        <section class="testimony section-padding" id="Testimonial">
            <div class="container-layout">
                <div class="row-layout">
                    <div class="section-title">
                        <h2 data-title="testimony">Some Feedback</h2>
                    </div>
                </div>
                <div class="row-layout">
                    <div class="testimony-item">
                        <div class="testimony-author">
                            <div class="testimony-name">
                                <h3>Chi Pu</h3>
                                <span>Ca sĩ</span>
                            </div>
                            <div class="testimony-img">
                                <img src="../assets/images/Test1.jpg" alt="" />
                            </div>
                        </div>
                        <p>
                            Một trong những nhà hàng ngon nhất tôi từng đến và thưởng
                            thức. Hương vị của từng món ăn rất đậm đà, lưu luyến.
                        </p>
                    </div>
                    <div class="testimony-item">
                        <div class="testimony-author">
                            <div class="testimony-name">
                                <h3>Trấn Thành</h3>
                                <span>MC</span>
                            </div>
                            <div class="testimony-img">
                                <img src="../assets/images/Test2.jpg" alt="" />
                            </div>
                        </div>
                        <p>
                            Một trong những nhà hàng ngon nhất tôi từng đến và thưởng
                            thức. Hương vị của từng món ăn rất đậm đà, lưu luyến.
                        </p>
                    </div>
                    <div class="testimony-item">
                        <div class="testimony-author">
                            <div class="testimony-name">
                                <h3>Đen Vâu</h3>
                                <span>Rapper</span>
                            </div>
                            <div class="testimony-img">
                                <img src="../assets/images/Test3.jpg" alt="" />
                            </div>
                        </div>
                        <p>
                            Một trong những nhà hàng ngon nhất tôi từng đến và thưởng
                            thức. Hương vị của từng món ăn rất đậm đà, lưu luyến.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <!-- Team Section begin -->
        <section class="team-section section-padding" id="Team">
            <div class="container-layout">
                <div class="row-layout">
                    <div class="section-title">
                        <h2 data-title="team">Our Chefs</h2>
                    </div>
                </div>
                <div class="row-layout">
                    <div class="team-item">
                        <img src="../assets/images/team1.jpg" alt="" />
                        <div class="team-item-info">
                            <h3>Nguyễn Văn Nhẽ</h3>
                            <p>Bếp trưởng</p>
                        </div>
                    </div>
                    <div class="team-item">
                        <img src="../assets/images/team2.jpg" alt="" />
                        <div class="team-item-info">
                            <h3>Phạm Thị Duyên</h3>
                            <p>Bếp phó</p>
                        </div>
                    </div>
                    <div class="team-item">
                        <img src="../assets/images/team3.jpg" alt="" />
                        <div class="team-item-info">
                            <h3>Nguyễn Tiến Tùng</h3>
                            <p>Đầu bếp</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- -------------------------------------- -->
        <!-- start booking -->
        <!-- -------------------------------------- -->

        <section class="testimony section-padding" id="Order">
            <div class="section-title mb-4">
                <h2 data-title="Đặt bàn Online"></h2>
            </div>
            <div style="width: 30%; margin: 0px auto">
                <div class="row d-flex justify-content-center">
                    <div class="col-md-12">
                        <BaseInputText
                            v-model:value="form.nameCustomer"
                            :is-required="true"
                            :placeholder="$t('booking.form.placeholder.nameCustomer')"
                            :label="$t('booking.form.nameCustomer')"
                            :error="translateYupError(form.errors.nameCustomer || '')"
                        />
                    </div>
                    <div class="col-md-12">
                        <BaseInputText
                            v-model:value="form.phone"
                            :is-required="true"
                            :error="translateYupError(form.errors.phone || '')"
                            :label="$t('booking.form.phone')"
                            :placeholder="$t('booking.form.placeholder.phone')"
                        />
                    </div>
                    <div class="col-md-12">
                        <BaseDatePicker
                            v-model:value="form.arrivalTime"
                            :placeholder="$t('booking.form.placeholder.arrivalTime')"
                            :label="$t('booking.form.arrivalTime')"
                            :error="translateYupError(form.errors.arrivalTime || '')"
                            :is-required="true"
                            :min-date="new Date()"
                            :type="'datetime'"
                            :date-format="YYYY_MM_DD_HYPHEN_HH_MM_COLON"
                            :value-format="YYYY_MM_DD_HYPHEN_HH_MM_COLON"
                        />
                    </div>
                    <div class="col-md-12">
                        <BaseInputNumber
                            v-model:value="form.numberPeople"
                            :is-required="true"
                            :placeholder="$t('booking.form.placeholder.numberPeople')"
                            :label="$t('booking.form.numberPeople')"
                            :error="translateYupError(form.errors.numberPeople || '')"
                            @change="setNumberPeople"
                        />
                    </div>
                </div>
                <div class="mt-5 d-flex justify-content-center">
                    <el-button type="primary" @click="onClickSaveButton">
                        {{ $t('booking.form.button.submit') }}
                    </el-button>
                </div>
            </div>
        </section>
        <!-- -------------------------------------- -->
        <!-- end booking -->
        <!-- -------------------------------------- -->

        <!-- Footer-section -->
        <section class="footer-section" id="Contact">
            <div class="container-layout">
                <div class="row-layout">
                    <div class="footer-item">
                        <h3>Địa chỉ</h3>
                        <p>
                            Số 1, Đại Cồ Việt <br />
                            Hai Bà Trưng, Hà Nội
                        </p>
                    </div>
                    <div class="footer-item">
                        <h3>Giờ mở cửa</h3>
                        <p>
                            09:30-23:00 <br />
                            Các ngày trong tuần
                        </p>
                    </div>
                    <div class="footer-item">
                        <h3>Liện hệ</h3>
                        <p>
                            Phone: 0377980440 <br />
                            Email: UyenDATN@gmail.com
                        </p>
                        <div class="social-item">
                            <i class="fab fa-facebook-f"></i>
                            <i class="fab fa-instagram"></i>
                            <i class="fab fa-twitter"></i>
                            <i class="fab fa-youtube"></i>
                        </div>
                    </div>
                </div>
                <div class="row-layout">
                    <div class="copyright">
                        <p>©20211. Project DATN</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { mixins, Options, setup } from 'vue-class-component';

import { initData } from '@/modules/booking/composition/createForm';
import { bookingModule } from '@/modules/booking/store';
import { tableDiagramModule } from '@/modules/table-diagram/store';
import { appModule } from '@/store/app';
import { UtilMixins } from '@/mixins/utilMixins';
import { menuModule } from '@/modules/menu/store';
import { ISelectOptions } from '@/common/types';
import { ICategoryUpdateBody, IFood } from '@/modules/menu/types';
import FoodCard from '@/modules/menu/components/food/FoodCard.vue';
import PromotionCard from '@/modules/promotion/components/PromotionCard.vue';
import { promotionModule } from '@/modules/promotion/store';
import { IPromotion } from '@/modules/promotion/types';
import { PromotionStatus } from '@/modules/promotion/constants';
import { LIMIT_PER_DROPDOWN } from '@/common/constants';

@Options({
    name: 'guest-page-component',
    components: { FoodCard, PromotionCard },
})
export default class GuestLayout extends mixins(UtilMixins) {
    get selectedCategory(): ICategoryUpdateBody | null {
        return menuModule.selectedCategory;
    }

    get categoryOptions(): ISelectOptions[] {
        return menuModule.categoryOptions;
    }

    get foodList(): IFood[] {
        return menuModule.foodList;
    }

    get promotionList(): IPromotion[] {
        return promotionModule.promotionList;
    }

    form = setup(() => initData());

    async onClickSaveButton(): Promise<void> {
        await this.form.onSubmit();
        bookingModule.setSelectedBooking(null);
    }

    beforeDestroy(): void {
        appModule.mutateIsGuestPage(false);
        bookingModule.setIsShowBookingFormPopUp(false);
        bookingModule.setSelectedBooking(null);
        tableDiagramModule.setTableSelected(null);
        (this.form.resetForm as () => void)();
    }

    async created(): Promise<void> {
        appModule.mutateIsGuestPage(true);
        promotionModule.setPromotionQueryString({
            status: PromotionStatus.ACTIVE,
            limit: LIMIT_PER_DROPDOWN,
        });
        promotionModule.getPromotions();
        await menuModule.getDropdownCategories();
        await this.changeCategory(menuModule.categoryOptions[0].value as number);
    }

    setNumberPeople(): void {
        bookingModule.setSelectedBooking({
            ...bookingModule.selectedBooking,
            id: undefined,
            numberPeople: this.form.numberPeople as number,
        });
    }

    async changeCategory(categoryId: number): Promise<void> {
        menuModule.setCategorySelected({ id: categoryId });
        menuModule.setFoodQueryString({
            categories: [categoryId],
        });
        console.log(menuModule.foodQueryString);

        await menuModule.getFoods();
    }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,700;1,100;1,200;1,400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,700;1,100;1,200;1,400&display=swap');
@import '../assets/styles/style.scss';

.header {
    .container-layout {
        display: flex;
        flex-direction: row-layout;
        justify-content: space-between;
        align-items: center;
    }
}

.scrollbar-flex-content-categories {
    display: flex;
}
.scrollbar-demo-item {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-danger-light-9);
    color: var(--el-color-danger);
}
</style>
