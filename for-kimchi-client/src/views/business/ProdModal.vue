<template>
  <div class="modal fade" id="productLookupModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">제품 검색</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
        </div>
        <div class="modal-body">
          <div class="input-group mb-3">
            <input v-model="searchKeyword" type="text" class="form-control" placeholder="제품명을 입력하세요" />
            <button class="btn btn-primary" @click="fetchProducts">조회</button>
          </div>

          <table class="table table-hover">
            <thead>
              <tr>
                <th>코드</th>
                <th>제품명</th>
                <th>규격</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in results" :key="item.code" @click="select(item)" style="cursor:pointer">
                <td>{{ item.code }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.spec }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductLookupModal",
  data() {
    return {
      searchKeyword: "",
      results: [],
    };
  },
  methods: {
    async fetchProducts() {
      const res = await axios.get("/api/products", {
        params: { keyword: this.searchKeyword },
      });
      this.results = res.data;
    },
    select(item) {
      this.$emit("selected", item); // 부모에 선택 항목 전달
      const modal = bootstrap.Modal.getInstance(document.getElementById("productLookupModal"));
      modal.hide(); // 모달 닫기
    },
  },
};
</script>
