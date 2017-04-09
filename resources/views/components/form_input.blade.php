{{--$label $name $value--}}
<div class="form-group">
    <label for="name">@lang('settings.'.$label):</label>
    <input type="text" name="{{$name}}" required @if($errors->has($name)) class="error" value="{{old($name)}}" @else value="{{$value}}" @endif>
    @if($errors->has($name)) <span class="error">{{$errors->first($name)}}</span> @endif
</div>

