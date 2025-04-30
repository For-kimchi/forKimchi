<template>
  <div class="container my-4">
    <h2 class="mb-4">Product Master Management</h2>

    <!-- Search Filter -->
    <div class="card p-3 mb-4">
      <div class="row g-3">
        <div class="col-md-4">
          <input v-model="searchName" type="text" class="form-control" placeholder="Search Product Name" />
        </div>
        <div class="col-md-4">
          <input v-model="searchId" type="text" class="form-control" placeholder="Search Product ID" />
        </div>
        <div class="col-md-4">
          <select v-model="searchType" class="form-select">
            <option value="">All Types</option>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
          </select>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col text-end">
          <button class="btn btn-primary" @click="fetchProducts">Search</button>
        </div>
      </div>
    </div>

    <div class="row">
      <!-- Left Side: Products and BOMs -->
      <div class="col-md-6">
        <div class="mb-4">
          <h5>Product List</h5>
          <div class="table-responsive" style="max-height: 250px; overflow-y: auto;">
            <table class="table table-bordered">
              <thead class="table-light">
                <tr>
                  <th>#</th>
                  <th>Product Code</th>
                  <th>Product Name</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(product, idx) in filteredProducts" :key="product.id" @click="selectProduct(product)" style="cursor: pointer;">
                  <td>{{ idx + 1 }}</td>
                  <td>{{ product.code }}</td>
                  <td>{{ product.name }}</td>
                </tr>
                <tr v-if="filteredProducts.length === 0">
                  <td colspan="3" class="text-center">No search results found.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="mb-4">
          <h5>BOM List</h5>
          <div class="table-responsive" style="max-height: 250px; overflow-y: auto;">
            <table class="table table-bordered">
              <thead class="table-light">
                <tr>
                  <th>#</th>
                  <th>Component Code</th>
                  <th>Component Name</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(bom, idx) in selectedBOMs" :key="bom.id" @click="selectBOM(bom)" style="cursor: pointer;">
                  <td>{{ idx + 1 }}</td>
                  <td>{{ bom.componentCode }}</td>
                  <td>{{ bom.componentName }}</td>
                </tr>
                <tr v-if="selectedBOMs.length === 0">
                  <td colspan="3" class="text-center">No BOM data found.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- BOM Add Form -->
          <div class="mt-3">
            <input v-model="newBOM.componentCode" class="form-control mb-2" placeholder="Component Code" />
            <input v-model="newBOM.componentName" class="form-control mb-2" placeholder="Component Name" />
            <div class="text-end">
              <button class="btn btn-success btn-sm" @click="addBOM">Add BOM</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side: Materials -->
      <div class="col-md-6">
        <h5>Material List</h5>
        <div class="table-responsive" style="max-height: 500px; overflow-y: auto;">
          <table class="table table-bordered">
            <thead class="table-light">
              <tr>
                <th>#</th>
                <th>Material Code</th>
                <th>Material Name</th>
                <th>Quantity</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(material, idx) in selectedMaterials" :key="material.id">
                <td>{{ idx + 1 }}</td>
                <td>{{ material.materialCode }}</td>
                <td>{{ material.materialName }}</td>
                <td>{{ material.quantity }}</td>
                <td>{{ material.unit }}</td>
              </tr>
              <tr v-if="selectedMaterials.length === 0">
                <td colspan="5" class="text-center">No materials found.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Material Add Form -->
        <div class="mt-3">
          <input v-model="newMaterial.materialCode" class="form-control mb-2" placeholder="Material Code" />
          <input v-model="newMaterial.materialName" class="form-control mb-2" placeholder="Material Name" />
          <input v-model.number="newMaterial.quantity" class="form-control mb-2" type="number" placeholder="Quantity" />
          <input v-model="newMaterial.unit" class="form-control mb-2" placeholder="Unit" />
          <div class="text-end">
            <button class="btn btn-success btn-sm" @click="addMaterial">Add Material</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "ProductMaster",
  data() {
    return {
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
    };
  },
  computed: {
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
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

