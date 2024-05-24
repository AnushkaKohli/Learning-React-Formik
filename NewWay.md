# Formik : New Way

Using `formik.handleBlur`, `formik.handleChange` and `formik.values.name` can be a tedious process. Formik provides a new way to handle form state and form events.

We can use the `formik.getFieldProps` method to handle form state and form events. In this method, we pass the id of the input field as an argument. This method returns an object with the necessary props to handle form state and form events.

```html
<input
    type="password"
    id="password"
    {...formik.getFieldProps("password")}
    placeholder="••••••••"
/>
```

It returns an object with the following properties:

- `value`: The value of the input field.
- `onChange`: The event handler for the `onChange` event.
- `onBlur`: The event handler for the `onBlur` event.
- `name`: The name of the input field.

It is similar to :

```html
<input
    type="text"
    name="name"
    id="name"
    onChange={formik.handleChange}
    value={formik.values.name}
    onBlur={formik.handleBlur}
    placeholder="Emelia Erickson"
    className=""
/>
```

## Using Formik Components

Formik provides a set of components to handle form state and form events. These components are:

### `<Formik>` Component

The `<Formik>` component is the top-level component that wraps the form. Itr is a replacement to the `useFormik` hook. The  object that is passed to the `useFormik` hook is passed as props to the `<Formik>` component.

```tsx
import { Formik } from "formik";
<Formik 
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
>
    {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
            {/* Form fields */}
        </form>
    )}
</Formik>
```

### `<Form>` Component

The `<Form>` component is a replacement to the `<form>` tag. It is used to wrap the form fields. The `onSubmit` prop is removed because the `<Form>` component is a small wrapper around the html `<form>` element that automatically hooks into Formik's `handleSubmit` method.

```tsx
import { Formik, Form } from "formik";
<Formik 
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
>
    <Form>
        {/* Form fields */}
    </Form>
</Formik>
```

### `<Field>` Component

The `<Field>` component is a replacement to the `<input>` tag. It is used to define the input fields in the form. The `<Field>` component does the following things for you:

- It automatically hooks up the `value` prop to Formik's `values` prop for the field.
- It automatically hooks up the `onChange` prop to Formik's `handleChange` method for the field.
- It automatically hooks up the `onBlur` prop to Formik's `handleBlur` method for the field.
- It uses the `name` attribute to match the formik state.
- It by default renders an `<input>` tag. You can pass the `as` prop to render a different tag.

```tsx
import { Formik, Form, Field } from "formik";
<Formik 
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
>
    <Form>
        <Field type="text" name="name" />
        <Field type="email" name="email" />
        <Field type="password" name="password" />
        <button type="submit">Submit</button>
    </Form>
</Formik>
```

#### Render Prop in `<Field>` Component

`<Field>` can also contain a callback function or render prop to render a custom component. The render prop receives an object with the following properties:

- `field`: An object with the necessary props to handle form state and form events. Eg. `value`, `onChange`, `onBlur`, `name`.
- `form`: An object with the form state and form helpers. Eg. `values`, `errors`, `touched`, `handleChange`, `handleBlur`.
- `meta`: An object with the field's metadata. Eg. `error`, `touched`, `initialValue`, `value`.

```tsx
<div>
    <label htmlFor="address">
        Address
    </label>
    <Field name="address">
    {
        (props: any) => {
            const { field, form, meta } = props;
            return (
                <div>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="1234 Main St"
                        {...field}
                    />
                    {meta.touched && meta.error && (
                        <div className="text-red-500 text-sm mt-1">
                            {meta.error}
                        </div>
                    )}
                    </div>
                );
            }
        }
    </Field>
    <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
</div>
```

### `<ErrorMessage>` Component

The `<ErrorMessage>` component is used to display error messages. It is used to display the error message for a specific field. The `name` prop is used to specify the field for which the error message should be displayed only if the field has been visited and the error message exists.

```tsx
import { Formik, Form, Field, ErrorMessage } from "formik";
<Formik 
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
>
    <Form>
        <Field type="text" name="name" />
        <ErrorMessage name="name" />
        <Field type="email" name="email" />
        <ErrorMessage name="email" />
        <Field type="password" name="password" />
        <ErrorMessage name="password" />
        <button type="submit">Submit</button>
    </Form>
</Formik>
```

#### Custom Error Message : Render Prop in `<ErrorMessage>` Component

The `<ErrorMessage>` component can also contain a callback function or render prop to render a custom error message. The render prop receives the error message as an argument.

```tsx
<ErrorMessage name="address">
{
    (error: string) => (
        <div className="text-red-500 text-sm mt-1">
            {error}
        </div>
    )
}
```

### Nested Fields in Formik

Formik also supports nested fields.

```tsx
const initialValues = {
    socials: {
        facebook: "",
        twitter: "",
    },
}

<Field
    type="text"
    id="twitter"
    name="socials.twitter"
    placeholder="https://twitter.com/username"
    className="formInput"
/>
```

### Array Fields in Formik

Formik also supports array fields.

```tsx
const initialValues = {
    phonenumbers: ["", ""],
}
<Field
    type="text"
    id="phone1"
    name="phonenumbers[0]"
    placeholder="123-456-7890"
    className="formInput"
/>
<Field
    type="text"
    id="phone2"
    name="phonenumbers[1]"
    placeholder="123-456-7890"
    className="formInput"
/>
```

### `<FieldArray>` Component: Dynamic Array Fields Using Render Prop Pattern

The `<FieldArray>` component is used to handle dynamic array fields. It is used to render an array of fields. The `name` prop is used to specify the name of the array field.

```tsx
const initialValues = {
    friends: [""],
}

<label htmlFor="friends">List of Friends</label>
<FieldArray name="friends">
    {
        (fieldArrayProps) => {
            // fieldArrayProps contains the necessary props to handle array fields
            const { push, remove, form } = fieldArrayProps;
            // form contains the form state and form helpers including values and errors
            const { values } = form;
            // extracting the friends array from the values object
            const { friends } = values;
            return (
                <div className="flex flex-col gap-4">
                    {
                        friends.map((friend: any, index: number) => (
                            <div key={index} className="flex">
                                <Field name={`friends[${index}]`} className="formInput" />
                                <button
                                    type="button"
                                    onClick={() => push("")}
                                >
                                    +
                                </button>
                                {
                                    index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                        >
                                            -
                                        </button>
                                    )
                                }
                            </div>
                        ))
                    }
                </div>
            )
        }
    }
</FieldArray>
```

### `<FastField>` Component

The `<FastField>` component is meant for optimization when using forms with more than 30 fields.

While using `<Field>` component, Formik will re-render the entire form whenever the form state changes of any field. This can be a performance issue when the form has more than 30 fields.

`<FastField>` only re-renders the field that has changed.

```tsx
<FastField name="address">
    {
        (props: any) => {
            console.log("FieldProps: ", props);
            const { field, form, meta } = props;
            return (
                <div>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="1234 Main St"
                        {...field}
                        className="formInput"
                    />
                    {meta.touched && meta.error && (
                        <div className="error">
                            {meta.error}
                        </div>
                    )}
                </div>
            );
        }
    }
</FastField>
```

## When does Formik runs validation?

Formik runs validation on the following events:

- When the form is submitted. (`onSubmit` event)
- When you have clicked on an input field and then clicked outside (`onBlur` event)
- When you have changed the value of that field. (`onChange` event)

Formik provides two ways to disable this automatic validation for `onBlur` and `onChange` events:

- `validateOnBlur`: It is used to disable validation on the `onBlur` event.
- `validateOnChange`: It is used to disable validation on the `onChange` event.

```tsx
<Formik 
    initialValues={initialValues}
    validationSchema={validationSchema}
    validateOnBlur={false}
    validateOnChange={false}
    onSubmit={onSubmit}
>
</Formik>
```

### Field Level Validation

Formik provides a `validate` prop to perform field level validation. The `validate` prop is a function that receives the form values as an argument and returns an object with the errors.

```tsx
const validateComments = (value: string) => {
    let error;
    if (!value) {
        error = "Required";
    }
    return error;
}
<Field
    as="textarea"
    id="comments"
    name="comments"
    placeholder="Your comments here..."
    validate={validateComments}
    className="formInput"
/>
```

### Render Props Pattern in `<Formik>` Component

The `<Formik>` component can also contain a callback function or render prop to render the form.

```tsx
<Formik 
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
>
    {
        (formikProps) => {
            // formikProps contains the form state and form helpers
            const { handleSubmit, values, errors, touched, handleChange, handleBlur } = formikProps;
            return (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Emelia Erickson"
                        className="formInput"
                    />
                    {touched.name && errors.name && (
                        <div className="error">
                            {errors.name}
                        </div>
                    )}
                    <button type="submit">Submit</button>
                </form>
            )
        }
    }
</Formik>
```
