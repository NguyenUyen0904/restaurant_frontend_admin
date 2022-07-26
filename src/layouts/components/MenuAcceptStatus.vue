<template>
    <div class="accept-status-select">
        <el-dropdown trigger="click">
            <div :class="`badge status-field badge-md bg-${statusBadge(status)}`">
                <span>{{ $t(`common.app.acceptStatus.${status}`) }}</span>
                <ArrowDownBoldIcon class="action-icon arrow-down" />
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="setStatus(AcceptStatus.APPROVE)">
                        {{ $t('common.app.acceptStatus.APPROVE') }}
                    </el-dropdown-item>
                    <el-dropdown-item @click="setStatus(AcceptStatus.WAITING_APPROVE)">
                        {{ $t('common.app.acceptStatus.WAITING_APPROVE') }}
                    </el-dropdown-item>
                    <el-dropdown-item
                        @click="setStatus(AcceptStatus.REQUEST_CHECK_AGAIN)"
                    >
                        {{ $t('common.app.acceptStatus.REQUEST_CHECK_AGAIN') }}
                    </el-dropdown-item>
                    <el-dropdown-item @click="setStatus(AcceptStatus.CHECKED_AGAIN)">
                        {{ $t('common.app.acceptStatus.CHECKED_AGAIN') }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script lang="ts">
import { mixins, Options } from 'vue-class-component';
import { UtilMixins } from '@/mixins/utilMixins';
import { AcceptStatus } from '@/modules/store/constants';
import { Prop } from 'vue-property-decorator';
import { IEmitStatus } from '@/common/types';

@Options({})
export default class MenuAcceptStatus extends mixins(UtilMixins) {
    @Prop({ default: 0 }) id!: number;
    @Prop({ default: AcceptStatus.APPROVE }) status!: AcceptStatus;
    setStatus(status: AcceptStatus): void {
        this.$emit('set-status', {
            id: this.id,
            status: status,
        } as IEmitStatus);
    }

    statusBadge(status: AcceptStatus): string {
        switch (status) {
            case AcceptStatus.APPROVE:
                return 'info';
            case AcceptStatus.CHECKED_AGAIN:
                return 'secondary';
            case AcceptStatus.REQUEST_CHECK_AGAIN:
            case AcceptStatus.REJECT:
                return 'danger';
            case AcceptStatus.WAITING_APPROVE:
                return 'success';
            default:
                return '';
        }
    }
}
</script>

<style lang="scss" scoped>
.language-select {
    background-color: transparent;
    display: flex;
    align-items: center;
    padding: 0 2px;
    height: 100%;
    .language-text {
        color: #212121;
        margin-left: 5px;
        @media only screen and (max-width: 991.98px) {
            display: none;
        }
    }
    .language-icon {
        width: 25px;
    }
    .nav-link {
        display: flex;
        align-items: center;
        &:hover {
            background: #ededed;
        }
    }
}
.el-dropdown-menu {
    padding: 0px !important;
}
.language-icon-sm {
    width: 16px;
    margin-right: 5px;
}
</style>
