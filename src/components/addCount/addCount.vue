<template>
  <div class="container">
    <div class="logo">
      <img src="../../assets/images/商品图片.jpeg" alt="衣服图片" />
    </div>
    <!-- 单价 -->
    <div class="unitPrice">
      <div class="text">单价</div>
      <div class="fu">$</div>
      <div class="price">{{ price }}</div>
    </div>
    <!-- 数量 -->
    <div class="count">
      <div class="text">数量</div>
      <div class="sum">
        <div class="left">
          <button @click="() => num--">
            <img src="../../assets/images/减.png" alt="减" />
          </button>
        </div>
        <div class="center">
          <input type="text" v-model="num" />
        </div>
        <div class="right">
          <button @click="() => num++">
            <img src="../../assets/images/加.png" alt="加" />
          </button>
        </div>
      </div>
    </div>
    <!-- 折扣率 -->
    <div class="DiscountRate">
      <div class="text">折扣率</div>
      <div class="rate">{{ rate }}折</div>
    </div>
    <!-- 商品总价 -->
    <div class="allPrice">
      <div class="text">商品总价</div>
      <div class="right">
        <div class="fu">$</div>
        <div class="price">{{ AllPrice }}</div>
      </div>
    </div>
    <!-- 查询总价 -->
    <div class="footer">
      <button class="search" @click="getSearch">
        <div class="logo">
          <img src="../../assets/images/搜索.png" alt="搜索" />
        </div>
        <div class="text">查询折扣并计算总价</div>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { RateRequest } from "@/api/index";
interface result {
  discount: number;
  message: string;
  status: number;
}

// 单价
const price = ref(200);
// 数量
const num = ref(2);
// 折扣率
const rate = ref(9);
const AllPrice = ref(200);
const getSearch = async () => {
  const res: result = await RateRequest({ count: num.value });
  if (res.status === 0) {
    rate.value = res.discount * 10;
    AllPrice.value = price.value * num.value * (rate.value / 10);
  }
};

watch(
  () => num.value,
  (newVal, oldVal) => {
    if (newVal >= 100) {
      num.value = 100;
    }
    if (newVal <= 1) {
      num.value = 1;
    }
  }
);
</script>

<style lang="scss" scoped>
.container {
  width: 375px;
  .logo {
    width: 375px;
    height: 375px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  // 单价
  .unitPrice {
    width: 375px;
    height: 48px;
    display: flex;
    align-items: center;
    padding-left: 12px;
    box-sizing: border-box;
    background-color: rgb(244, 244, 244);
    .text {
      font-size: 12px;
      padding-right: 10px;
      color: rgb(102, 102, 102);
    }
    .fu {
      font-size: 12px;
      padding-right: 5px;
      color: rgb(255, 96, 0);
    }
    .price {
      font-size: 18px;
      color: rgb(255, 96, 0);
    }
  }

  .count {
    width: 375px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px 0 12px;
    box-sizing: border-box;
    .text {
      font-size: 14px;
    }
    .sum {
      width: 120px;
      height: 32px;
      display: flex;
      align-items: center;
      .left button,
      .right button {
        width: 32px;
        height: 32px;
        border: 1px solid #f4f4f4;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 16px;
          height: 16px;
        }
      }
      .center {
        flex: 1;
        height: 32px;

        input {
          width: 100%;
          height: 100%;
          outline: none;
          border: 1px solid #d8d8d8;
          display: flex;
          text-align: center;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
        }
      }
    }
  }

  // 折扣率
  .DiscountRate {
    width: 375px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px 0 12px;
    box-sizing: border-box;
    font-size: 14px;
    .text {
      width: 160px;
    }
    .rate {
      width: 160px;
      text-align: right;
      color: rgb(255, 96, 0);
    }
  }
  // 商品总价
  .allPrice {
    width: 375px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px 0 12px;
    box-sizing: border-box;
    font-size: 14px;
    .right {
      display: flex;
      align-items: center;
      justify-content: center;
      .fu {
        font-size: 12px;
        padding-right: 5px;
        color: rgb(255, 96, 0);
      }
      .price {
        font-size: 18px;
        color: rgb(255, 96, 0);
      }
    }
  }
  // 查询总价
  .footer {
    width: 375px;
    height: 40px;
    display: flex;
    justify-content: center;
  }
  .search {
    width: 176px;
    height: 40px;
    background-color: rgb(255, 96, 0);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border: none;
    .logo {
      width: 16px;
      height: 16px;
      padding-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }
  button:hover {
    cursor: pointer;
  }
}
</style>
