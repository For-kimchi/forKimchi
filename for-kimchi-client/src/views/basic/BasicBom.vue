<template>
  <div class="container my-4">
    <!-- Search Filter -->
    <div class="card p-3 mb-4">
      <div class="row g-3">
        <div class="col-md-3">
          <input v-model="prod.prod_name" type="text" class="form-control border text-center" @keydown.prevent
                  @click="showProd = true" placeholder="제품명" />
        </div>
        <div class="col-md-3">
          <input v-model="prod.prod_id" type="text" class="form-control border text-center" placeholder="제품ID" />
        </div>
        <div class="col-md-3">
          <input v-model="prod.prod_type" type="text" class="form-control border text-center" placeholder="제품분류" />
        </div>
        <div class="col-md-3">
          <button class="btn btn-primary">저장</button>
        </div>
      </div>
    </div>

    <div class="row">
      <!-- Left Side: Products -->
      <div class="col-md-6">
        <div class="card p-3 mb-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
              <h6 class="text-white text-capitalize ps-3">BOM 정보</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0" style="max-height: 300px;">
              <table class="table align-items-center justify-content-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">제품명</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">제품ID</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">주문수량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">납품일자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in orderDetails" v-bind:key="info.order_detail_id">
                    <td class="align-middle text-center">
                      <input class="form-control border text-center" type="text" v-model="info.prod_name" readonly
                        @click="openProdModal(index)" placeholder="제품명"></td>
                    <td class="align-middle text-center">
                      <input class="form-control border text-center" type="text" v-model="info.prod_id" readonly></td>
                    <td class="align-middle text-center">
                      <input class="form-control border text-center" type="number" v-model="info.order_amount"></td>
                    <td class="align-middle text-center">
                      <input class="form-control border text-center" type="date" v-model="info.deliv_due_date"></td>
                    <td class="align-middle text-center">
                      <button class="btn btn-danger ms-2" @click="removeRows(index)">삭제</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side: Materials -->
      <div class="col-md-6">
        <div class="card p-3 mb-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
              <h6 class="text-white text-capitalize ps-3">자재 정보</h6>
            </div>
          </div>


          <div class="card-body px-0 pb-2">
            <div class="row g-3 mt-2">
            <div class="col-md-6">
            <input v-model="materialSearch" type="text" class="form-control border text-center" placeholder="자재명" />
            </div>
            <div class="col-md-3">
              <button class="btn btn-primary" @click="searchMaterial">검색</button>
            </div>
          </div>
            <div class="table-responsive p-0" style="max-height: 300px;">
              <table class="table align-items-center justify-content-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">자재명</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">자재ID</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">주문수량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">납품일자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in orderDetails" v-bind:key="info.order_detail_id">
                    <td class="align-middle text-center">
                      <input class="form-control border text-center" type="text" v-model="info.prod_name" readonly
                        @click="openProdModal(index)" placeholder="제품명"></td>
                    <td class="align-middle text-center">
                      <input class="form-control border text-center" type="text" v-model="info.prod_id" readonly></td>
                    <td class="align-middle text-center">
                      <input class="form-control border text-center" type="number" v-model="info.order_amount"></td>
                    <td class="align-middle text-center">
                      <input class="form-control border text-center" type="date" v-model="info.deliv_due_date"></td>
                    <td class="align-middle text-center">
                      <button class="btn btn-danger ms-2" @click="removeRows(index)">삭제</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ProdModal :visible="showProd" @close="showProd = false" @select="onSelectProd" />
  </div>
</template>



<script>
import ProdModal from '../business/ProdModal.vue';

export default {
  components: {
    ProdModal,
  },
  data() {
    return {
      showProd: false,
      searchName: "",
      searchId: "",
      searchType: "",
      products: [],
      boms: [],
      materials: [],
      selectedProduct: {},
      selectedBOM: {},
      selectedMaterial: {},
      newBOM: {
        componentCode: '',
        componentName: '',
      },
      newMaterial: {
        materialCode: '',
        materialName: '',
        quantity: 0,
        unit: '',
      },
      prod:{},
      materialSearch: '',
    };
  },
  computed: {
    filteredMaterials() {
    if (!this.selectedBOM.id) return [];
    return this.materials
      .filter(m => m.bomId === this.selectedBOM.id)
      .filter(m => {
        return this.materialSearch
          ? m.materialName.toLowerCase().includes(this.materialSearch.toLowerCase())
          : true;
      });
  },
    filteredProducts() {
      return this.products.filter((p) => {
        const matchesName = this.searchName ? p.name.includes(this.searchName) : true;
        const matchesId = this.searchId ? p.code.includes(this.searchId) : true;
        const matchesType = this.searchType ? p.type === this.searchType : true;
        return matchesName && matchesId && matchesType;
      });
    },
    selectedBOMs() {
      if (!this.selectedProduct.id) return [];
      return this.boms.filter(b => b.productId === this.selectedProduct.id);
    },
    selectedMaterials() {
      if (!this.selectedBOM.id) return [];
      return this.materials.filter(m => m.bomId === this.selectedBOM.id);
    },
  },
  methods: {
    fetchProducts() {
      this.products = [
        { id: 1, code: "P001", name: "Product A", type: "Standard" },
        { id: 2, code: "P002", name: "Product B", type: "Premium" },
      ];
    },
    selectProduct(product) {
      this.selectedProduct = product;
      this.selectedBOM = {};
      this.selectedMaterial = {};
      this.fetchBOMs(product.id);
    },
    fetchBOMs(productId) {
      this.boms = [
        { id: 1, productId: 1, componentCode: "C001", componentName: "Component A" },
        { id: 2, productId: 1, componentCode: "C002", componentName: "Component B" },
        { id: 3, productId: 2, componentCode: "C003", componentName: "Component C" },
      ];
    },
    selectBOM(bom) {
      this.selectedBOM = bom;
      this.selectedMaterial = {};
      this.fetchMaterials(bom.id);
    },
    fetchMaterials(bomId) {
      this.materials = [
        { id: 1, bomId: 1, materialCode: "M001", materialName: "Material A", quantity: 2, unit: "pcs" },
        { id: 2, bomId: 1, materialCode: "M002", materialName: "Material B", quantity: 5, unit: "pcs" },
        { id: 3, bomId: 2, materialCode: "M003", materialName: "Material C", quantity: 1, unit: "pcs" },
      ];
    },
    addBOM() {
      if (!this.selectedProduct.id || !this.newBOM.componentCode) return;
      const newId = this.boms.length ? Math.max(...this.boms.map(b => b.id)) + 1 : 1;
      this.boms.push({ id: newId, productId: this.selectedProduct.id, ...this.newBOM });
      this.newBOM = { componentCode: '', componentName: '' };
    },
    addMaterial() {
      if (!this.selectedBOM.id || !this.newMaterial.materialCode) return;
      const newId = this.materials.length ? Math.max(...this.materials.map(m => m.id)) + 1 : 1;
      this.materials.push({ id: newId, bomId: this.selectedBOM.id, ...this.newMaterial });
      this.newMaterial = { materialCode: '', materialName: '', quantity: 0, unit: '' };
    },
      onSelectProd(prod) {
        this.prod = prod;
      }, 
      searchMaterial() {
    // 버튼 클릭 시 computed 강제 반영용 (v-model이니까 사실 없어도 작동)
    this.materialSearch = this.materialSearch.trim();
  },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

