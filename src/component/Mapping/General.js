import React from "react";
import 'select2/dist/css/select2.min.css'
// import axios from 'axios' 


const General = () => {

    return (

        <table class="ced_umb_mapping_table">
            <tbody>
                <tr>
                    <th>Marketplace Field</th>
                    <th>Default Value</th>
                    <th>Your Online Store Field</th>
                </tr>
                <tr>
                    <td><label class="ced_umb_mapping_label">SKU</label></td>
                    <td><input type="text" name="ced_umb_general_attributes" /></td>
                    <td>
                        <select id="" name="" multiple="" class="ced_umb_select2" >
                            <optgroup label="Global Attributes">
                                <option value="umb_pattr_color">Color</option>
                                <option value="umb_pattr_size">Size</option>
                            </optgroup>

                        </select>
                        <span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="select2-data-2-t4w8" style={{ width: '151.766px', }}>
                            <span class="selection">
                                <span class="select2-selection select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1" aria-disabled="false">
                                    <ul class="select2-selection__rendered" id="select2--container"></ul>
                                    <span class="select2-search select2-search--inline">
                                        <textarea class="select2-search__field" type="search" tabindex="0" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" autocomplete="off" aria-label="Search" aria-describedby="select2--container" placeholder="" style={{ width: '151.766px', }} ></textarea>
                                    </span>
                                </span>
                            </span>
                            <span class="dropdown-wrapper" aria-hidden="true"></span>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td><label class="ced_umb_mapping_label">Product Title</label></td>
                    <td><input type="text" name="ced_umb_general_attributes" /></td>
                    <td>
                        <select id="" name="" multiple="" class="ced_umb_select2" >
                            <optgroup label="Global Attributes">				
                                <option value="umb_pattr_color">Color</option>
                                <option value="umb_pattr_size">Size</option>
                            </optgroup>	</select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="select2-data-4-1gz5" style={{ width: '151.766px', }} ><span class="selection"><span class="select2-selection select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1" aria-disabled="false"><ul class="select2-selection__rendered" id="select2--container"></ul><span class="select2-search select2-search--inline"><textarea class="select2-search__field" type="search" tabindex="0" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" autocomplete="off" aria-label="Search" aria-describedby="select2--container" placeholder="" style={{ width: '151.766px', }} ></textarea></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                    </td>
                </tr>
                <tr>
                    <td><label class="ced_umb_mapping_label">Product Description</label></td>
                    <td><input type="text" name="ced_umb_general_attributes" /></td>
                    <td>
                        <select id="" name="" multiple="" class="ced_umb_select2" >
                            <optgroup label="Global Attributes">
                                <option value="umb_pattr_color">Color</option>
                                <option value="umb_pattr_size">Size</option>
                            </optgroup>	</select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="select2-data-6-lyf7" style={{ width: '151.766px', }} ><span class="selection"><span class="select2-selection select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1" aria-disabled="false"><ul class="select2-selection__rendered" id="select2--container"></ul><span class="select2-search select2-search--inline"><textarea class="select2-search__field" type="search" tabindex="0" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" autocomplete="off" aria-label="Search" aria-describedby="select2--container" placeholder="" style={{ width: '151.766px', }} ></textarea></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                    </td>
                </tr>
                <tr>
                    <td><label class="ced_umb_mapping_label">Regular Price</label></td>
                    <td><input type="text" name="ced_umb_general_attributes" /></td>
                    <td>
                        <select id="" name="" multiple="" class="ced_umb_select2" >
                            <optgroup label="Global Attributes">			
                            	<option value="umb_pattr_color">Color</option>
                                <option value="umb_pattr_size">Size</option>
                            </optgroup>	</select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="select2-data-8-2klt" style={{ width: '151.766px', }} ><span class="selection"><span class="select2-selection select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1" aria-disabled="false"><ul class="select2-selection__rendered" id="select2--container"></ul><span class="select2-search select2-search--inline"><textarea class="select2-search__field" type="search" tabindex="0" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" autocomplete="off" aria-label="Search" aria-describedby="select2--container" placeholder="" style={{ width: '151.766px', }} ></textarea></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                    </td>
                </tr>
                <tr>
                    <td><label class="ced_umb_mapping_label">Selling Price</label></td>
                    <td><input type="text" name="ced_umb_general_attributes" /></td>
                    <td>
                        <select id="" name="" multiple="" class="ced_umb_select2" >
                            <optgroup label="Global Attributes">			
                            	<option value="umb_pattr_color">Color</option>
                                <option value="umb_pattr_size">Size</option>
                            </optgroup>	</select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="select2-data-10-2zlo" style={{ width: '151.766px', }} ><span class="selection"><span class="select2-selection select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1" aria-disabled="false"><ul class="select2-selection__rendered" id="select2--container"></ul><span class="select2-search select2-search--inline"><textarea class="select2-search__field" type="search" tabindex="0" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" autocomplete="off" aria-label="Search" aria-describedby="select2--container" placeholder="" style={{ width: '151.766px', }} ></textarea></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                    </td>
                </tr>
                <tr>
                    <td><label class="ced_umb_mapping_label">Quantity</label></td>
                    <td><input type="text" name="ced_umb_general_attributes" /></td>
                    <td>
                        <select id="" name="" multiple="" class="ced_umb_select2" >
                            <optgroup label="Global Attributes">
                                <option value="umb_pattr_color">Color</option>
                                <option value="umb_pattr_size">Size</option>
                            </optgroup>	</select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="select2-data-12-z97w" style={{ width: '151.766px', }} ><span class="selection"><span class="select2-selection select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1" aria-disabled="false"><ul class="select2-selection__rendered" id="select2--container"></ul><span class="select2-search select2-search--inline"><textarea class="select2-search__field" type="search" tabindex="0" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" autocomplete="off" aria-label="Search" aria-describedby="select2--container" placeholder="" style={{ width: '151.766px', }} ></textarea></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                    </td>
                </tr>
                <tr>
                    <td><label class="ced_umb_mapping_label">Brand Name</label></td>
                    <td><input type="text" name="ced_umb_general_attributes" /></td>
                    <td>
                        <select id="" name="" multiple="" class="ced_umb_select2" >
                            <optgroup label="Global Attributes">				<option value="umb_pattr_color">Color</option>
                                <option value="umb_pattr_size">Size</option>
                            </optgroup>	</select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="select2-data-14-m0y0" style={{ width: '151.766px', }} ><span class="selection"><span class="select2-selection select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1" aria-disabled="false"><ul class="select2-selection__rendered" id="select2--container"></ul><span class="select2-search select2-search--inline"><textarea class="select2-search__field" type="search" tabindex="0" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" autocomplete="off" aria-label="Search" aria-describedby="select2--container" placeholder="" style={{ width: '151.766px', }} ></textarea></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                    </td>
                </tr>
                <tr>
                    <td><label class="ced_umb_mapping_label">GTIN/Barcode</label></td>
                    <td><input type="text" name="ced_umb_general_attributes" /></td>
                    <td>
                        <select id="" name="" multiple="" class="ced_umb_select2" >
                            <optgroup label="Global Attributes">
                                <option value="umb_pattr_color">Color</option>
                                <option value="umb_pattr_size">Size</option>
                            </optgroup>	</select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="select2-data-16-tjdx" style={{ width: '151.766px', }} ><span class="selection"><span class="select2-selection select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1" aria-disabled="false"><ul class="select2-selection__rendered" id="select2--container"></ul><span class="select2-search select2-search--inline"><textarea class="select2-search__field" type="search" tabindex="0" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" autocomplete="off" aria-label="Search" aria-describedby="select2--container" placeholder="" style={{ width: '151.766px', }} ></textarea></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                    </td>
                </tr>
                <tr>
                    <td><label class="ced_umb_mapping_label">Main Image Url</label></td>
                    <td><input type="text" name="ced_umb_general_attributes" /></td>
                    <td>
                        <select id="" name="" multiple="" class="ced_umb_select2" >
                            <optgroup label="Global Attributes">
                                <option value="umb_pattr_color">Color</option>
                                <option value="umb_pattr_size">Size</option>
                            </optgroup>	</select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="select2-data-18-lb73" style={{ width: '151.766px', }} ><span class="selection"><span class="select2-selection select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1" aria-disabled="false"><ul class="select2-selection__rendered" id="select2--container"></ul><span class="select2-search select2-search--inline"><textarea class="select2-search__field" type="search" tabindex="0" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" autocomplete="off" aria-label="Search" aria-describedby="select2--container" placeholder="" style={{ width: '0.75em' }} ></textarea></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                    </td>
                </tr>
            </tbody>
        </table>

    )
}

export default General;