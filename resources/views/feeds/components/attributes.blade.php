@if($type == 'string')
    <div class="form-group">
        <label for="name">@lang('marketplaces.'.$attribute):</label>
        <input type="text" name="attributes[{{$attribute}}]" required @if(isset($attributes) && $attributes[$attribute]) value="{{$attributes[$attribute]}}" @else value="" @endif>
    </div>
@endif