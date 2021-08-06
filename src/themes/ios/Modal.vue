<template>
  <div class="b__component_modal_wrapper">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"> </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <span>Send Email using tamplate: </span>
              <b-select
                item-text="name"
                item-val="code"
                label="Select template"
                name="minh"
                class-name="testing-b-select"
                placeholder="Select box"
                v-model="select"
                :list="list"
              ></b-select>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <b-button
                type="button"
                class-name="button-primary"
                label="Done"
                @click.native=""
              >
              </b-button>
              <b-button
                type="button"
                class-name="button-danger"
                label="Close"
                @click.native="$emit('input', showModal)"
              >
              </b-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Modal from './../../components/Modal'
  export default Modal
</script>
