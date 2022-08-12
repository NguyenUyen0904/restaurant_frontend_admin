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

                <button class="nav-toggler">
                    <span> </span>
                </button>
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
                        <button
                            type="button"
                            class="menu-tap-item active"
                            data-target="#Lunch"
                        >
                            Lunch
                        </button>
                        <button type="button" class="menu-tap-item" data-target="#Dinner">
                            Dinner
                        </button>
                        <button type="button" class="menu-tap-item" data-target="#Drinks">
                            Drinks
                        </button>
                        <button
                            type="button"
                            class="menu-tap-item"
                            data-target="#Desserts"
                        >
                            Desserts
                        </button>
                    </div>
                </div>
                <!-- <div class="row-layout menu-tap-content active" id="Lunch">
                    <food-menu :listFood="getFoods" />
                </div>
                <div class="row-layout menu-tap-content" id="Dinner">
                    <food-menu :listFood="getFoods" />
                </div>
                <div class="row-layout menu-tap-content" id="Drinks">
                    <food-menu :listFood="getFoods" />
                </div>
                <div class="row-layout menu-tap-content" id="Desserts"></div> -->
            </div>
        </section>
        <!-- Menu-Section-end -->
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
                        <div class="rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
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
                        <div class="rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
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
                        <div class="rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
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
        <section class="testimony section-padding" id="Order">
            <div class="row">
                <div class="col-md-6">
                    <BaseInputText
                        v-model:value="form.nameCustomer"
                        :is-required="true"
                        :placeholder="$t('booking.booking.placeholder.nameCustomer')"
                        :label="$t('booking.booking.bookingDialog.nameCustomer')"
                        :error="translateYupError(form.errors.nameCustomer)"
                    />
                </div>
                <div class="col-md-6">
                    <BaseInputText
                        v-model:value="form.phone"
                        :is-required="true"
                        :error="translateYupError(form.errors.phone)"
                        :label="$t('booking.booking.bookingDialog.phone')"
                        :placeholder="$t('booking.booking.placeholder.phone')"
                    />
                </div>
                <div class="col-md-6">
                    <BaseDatePicker
                        v-model:value="form.arrivalTime"
                        :placeholder="$t('booking.booking.placeholder.arrivalTime')"
                        :label="$t('booking.booking.bookingDialog.arrivalTime')"
                        :error="translateYupError(form.errors.arrivalTime)"
                        :is-required="true"
                        :min-date="new Date()"
                        :default-value="minEndDate"
                        :type="'datetime'"
                        :date-format="YYYY_MM_DD_HYPHEN_HH_MM_COLON"
                        :value-format="YYYY_MM_DD_HYPHEN_HH_MM_COLON"
                    />
                </div>
                <div class="col-md-6">
                    <BaseInputNumber
                        v-model:value="form.numberPeople"
                        :is-required="true"
                        :placeholder="$t('booking.booking.placeholder.numberPeople')"
                        :label="$t('booking.booking.bookingDialog.numberPeople')"
                        :error="translateYupError(form.errors.numberPeople)"
                        @change="setNumberPeople"
                    />
                </div>
            </div>
            <div class="mt-5 d-flex justify-content-center">
                <el-button
                    type="primary"
                    @click="onClickSaveButton"
                    :disabled="isDisabledSaveButton"
                >
                    {{ $t('booking.booking.button.submit') }}
                </el-button>
            </div>
        </section>
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

@Options({
    name: 'guest-page-component',
    components: {},
})
export default class GuestLayout extends mixins(UtilMixins) {
    form = setup(() => initData());

    async onClickSaveButton(): Promise<void> {
        bookingModule.setIsDisabledSaveButton(true);
        await this.form.onSubmit();
        bookingModule.setSelectedBooking(null);
        bookingModule.setIsDisabledSaveButton(false);
    }

    beforeDestroy(): void {
        appModule.mutateIsGuestPage(false);
        bookingModule.setIsShowBookingFormPopUp(false);
        bookingModule.setSelectedBooking(null);
        tableDiagramModule.setTableSelected(null);
        (this.form.resetForm as () => void)();
    }

    created(): void {
        appModule.mutateIsGuestPage(true);
    }

    setNumberPeople(): void {
        bookingModule.setSelectedBooking({
            ...bookingModule.selectedBooking,
            id: undefined,
            numberPeople: this.form.numberPeople as number,
        });
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
</style>
