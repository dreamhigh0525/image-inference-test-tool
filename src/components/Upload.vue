<template>
  <div class="uk-container uk-padding">
    <h1 class="uk-heading-divider">{{ msg }}</h1>
    <div uk-form-custom>
      <input @change="selectedFile" type="file" name="file" ref="preview" />
      <input
        class="uk-input uk-form-width-medium"
        type="text"
        placeholder="ファイル選択"
        disabled
      />
    </div>
    <button class="uk-button uk-button-primary" @click="uploadFile" type="button">
      送信
    <span uk-icon='image'></span>
    </button>
    <span class="uk-margin-left">{{ fileName }}</span>
    <div uk-spinner v-show="uploading" class="uk-margin-left"></div>
    <div class="uk-child-width-expand@s uk-text-center" uk-grid>
      <div class="uk-margin-top">
        <div class="preview" v-if="url">
          <img :src="url" width="600" height="600" />
        </div>
      </div>
  
      <div class="result uk-margin-top">
        <span class="uk-label uk-margin-right">判定</span>{{ label }}
        <span class="uk-label uk-margin-left uk-margin-right">信頼度</span>{{ confidence }}
      </div>
    </div>
  </div>
  
  
</template>

<script>
import UIkit from "uikit";
import Icons from 'uikit/dist/js/uikit-icons';
import axios from "axios";

UIkit.use(Icons);

export default {
  name: "Upload",
  props: {
    msg: String,
  },
  data() {
    return {
      url: null,
      //api_url: "http://localhost:8000/inference",
      api_url: "http://172.18.212.210:8000/inference",
      image: null,
      label: '',
      confidence: 0.0,
      fileName: '',
      uploading: false
    };
  },
  methods: {
    async uploadFile() {
      try {
        this.uploading = true;
        this.label = '...';
        this.confidence = '...';
        const data = this.createFormData();
        const headers = { "content-type": "multipart/form-data" };
        const res = await axios.post(this.api_url, data, headers);
        if(res.data.label == '1') {
          this.label = 'positive';
        } else {
          this.label = 'negative';
        }
        this.confidence = res.data.confidence;
        console.log(res);
        this.uploading = false;
      } catch (e) {
        console.log(e);
      }
    },
    selectedFile() {
      const file = this.$refs.preview.files[0];
      console.log(file);
      this.fileName = file.name;
      if(file.type == 'image/jpeg' || file.type == 'image/png') {
        this.url = URL.createObjectURL(file);
        //this.$refs.preview.value = "";
        this.image = file;
      } else {
        this.fileName = '画像ファイルを選択してください';
      }
    },
    createFormData() {
      const data = new FormData();
      data.append("file", this.image);
      const id = new Blob(["aid"], { type: "text/plain" });
      data.append("id", id);
      const url = new Blob(["http://test.jpg"], { type: "text/plain" });
      data.append("url", url);
      const category = new Blob(["gun"], { type: "text/plain" });
      data.append("category", category);
      return data;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
