<template>
    <div class="container-fluid">
        <div class="row mt-3">
            <div class="col-12">
                <div class="card my-4">
                    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                        <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
                            <h6 class="text-white text-capitalize ps-3">제품현황</h6>
                        </div>
                    </div>

                    <div class="card-body px-0 pb-2">
                        <div class="row align-items-center g-3 px-3">
                            <div class="col-md-9 d-flex align-items-center gap-3">
                                <h6 class="mb-0 text-dark text-sm">제품창고</h6>
                                <select v-model="warehouseFilter" @change="doFilter"
                                    class="form-select form-select-sm border bg-white text-dark" style="width: 160px;">
                                    <option value="">전체</option>
                                    <option v-for="(info, index) in warehouses" :key="info.warehouse_id"
                                        :value="info.warehouse_id">
                                        {{ info.warehouse_name }}
                                    </option>
                                </select>
                                <h6 class="mb-0 text-dark text-sm">제품명</h6>
                                <input class="form-control form-control-sm border bg-white text-dark" style="width: 160px;" type="text" @change="doFilter" v-model="prodFilter">
                                <button class="btn btn-secondary btn-group-sm m-0" @click="reset">초기화</button>
                            </div>

                            <div class="col-md-3 d-flex justify-content-md-end">
                                <div class="btn-group btn-group-sm" role="group" aria-label="조회 방식">
                                    <input type="radio" class="btn-check" id="lotView" value="lot" v-model="searchType"
                                        @change="getProdWarehouse" autocomplete="off">
                                    <label class="btn btn-outline-success mb-0 px-3"
                                        :class="searchType === 'lot' ? 'bg-success text-white' : 'bg-white text-success'"
                                        for="lotView">
                                        LOT별 조회
                                    </label>

                                    <input type="radio" class="btn-check" id="groupView" value="group"
                                        v-model="searchType" @change="getProdWarehouse" autocomplete="off">
                                    <label class="btn btn-outline-success mb-0 px-3"
                                        :class="searchType === 'group' ? 'bg-success text-white' : 'bg-white text-success'"
                                        for="groupView">
                                        제품별 조회
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="table-responsive p-0">
                            <table class="table align-items-center mb-0">
                                <template v-if="searchType === 'lot'">
                                    <thead>
                                        <tr>
                                        <th class="text-center font-weight-bolder">제품LOT</th>
                                        <th class="text-center font-weight-bolder">제품명</th>
                                        <th class="text-center font-weight-bolder">제품창고</th>
                                        <th class="text-center font-weight-bolder">입고수량</th>
                                        <th class="text-center font-weight-bolder">출고수량</th>
                                        <th class="text-center font-weight-bolder">잔여수량</th>
                                        <th class="text-center font-weight-bolder">입고일자</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(info, index) in filtered" :key="info.prod_lot + '_' + info.warehouse_id">
                                            <td class="text-center">
                                                {{ info.prod_lot }}</td>
                                            <td class="text-center">
                                                {{ info.prod_name }}</td>
                                            <td class="text-center">
                                                {{ info.warehouse_name }}</td>
                                            <td class="text-center">
                                                {{ info.prod_amount }}</td>
                                            <td class="text-center">
                                                {{ info.prod_amount - info.remain_amount }}</td>
                                            <td class="text-center">
                                                {{ info.remain_amount }}</td>
                                            <td class="text-center">
                                                {{ formatDate(info.inbound_date) }}</td>
                                        </tr>
                                    </tbody>
                                </template>
                                <template v-else>
                                    <thead>
                                        <tr>
                                        <th class="text-center font-weight-bolder">제품ID</th>
                                        <th class="text-center font-weight-bolder">제품명</th>
                                        <th class="text-center font-weight-bolder">제품창고</th>
                                        <th class="text-center font-weight-bolder">입고총량</th>
                                        <th class="text-center font-weight-bolder">출고총량</th>
                                        <th class="text-center font-weight-bolder">잔여총량</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(info, index) in filtered" :key="info.prod_id + '_' + info.warehouse_id">
                                            <td class="text-center">
                                                {{ info.prod_id }}</td>
                                            <td class="text-center">
                                                {{ info.prod_name }}</td>
                                            <td class="text-center">
                                                {{ info.warehouse_name }}</td>
                                            <td class="text-center">
                                                {{ info.total_prod_amount }}</td>
                                            <td class="text-center">
                                                {{ info.total_prod_amount - info.total_remain_amount }}</td>
                                            <td class="text-center">
                                                {{ info.total_remain_amount }}</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { formatDate } from '../../utils/common';

    export default {

        data() {
            return {
                prodWarehouses: [],
                filtered: [],
                searchType: 'lot',
                prodFilter: '',
                warehouseFilter: '',
                warehouses: [],
            };
        },
        created() {
            this.getProdWarehouse();
            this.getWarehouse();
        },
        computed: {
        },
        methods: {
            async getProdWarehouse() {
                try {
                    const params = {
                        type: this.searchType,
                    };

                    let res = await axios.get('/api/prodWarehouse', {
                        params
                    }).catch(err => console.log(err));

                    this.prodWarehouses = res.data;
                    this.doFilter();
                } catch (err) {
                    console.error('창고현황 조회 실패:', err);
                }
            },
            async getWarehouse() {
                let res = await axios.get(`/api/warehouse/2h`)
                    .catch(err => console.log(err));
                this.warehouses = res.data;
            },
            formatDate(dateString) {
                return formatDate(dateString);
            },
            doFilter() {
                this.filtered = this.prodWarehouses.filter(item => {
                        const matchProd = !this.prodFilter || item.prod_name.includes(this.prodFilter);
                        const matchWarehouse = !this.warehouseFilter || item.warehouse_id === this.warehouseFilter;
                    return matchProd && matchWarehouse;
                });
            },
            reset() {
                this.warehouseFilter = '';
                this.prodFilter = '';
                this.doFilter();
            }
        }
    }
</script>