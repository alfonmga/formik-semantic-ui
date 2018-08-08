import React from 'react';
import {render, cleanup, fireEvent, wait} from 'react-testing-library';

import {Button, Checkbox, Dropdown, Form, Input, TextArea} from '../lib/index';

describe('formik-semantic-ui', () => {
  afterEach(() => {
    cleanup();
  });

  describe('Basic Components', () => {
    describe('Input', () => {
      it('default ', () => {
        const {container} = render(
          <Form initialValues={{name: ''}}>
            <Input label="Name" name="name" />
          </Form>
        );
        expect(container).toMatchSnapshot();
      });

      it('with initial value ', () => {
        const {container} = render(
          <Form initialValues={{name: 'Justin'}}>
            <Input label="Name" name="name" />
          </Form>
        );
        expect(container).toMatchSnapshot();
      });

      it('without label and with custom "id" ', () => {
        const {container} = render(
          <Form initialValues={{name: ''}}>
            <Input name="name" id="my-custom-id" />
          </Form>
        );
        expect(container).toMatchSnapshot();
      });

      it('with custom "id" ', () => {
        const {container} = render(
          <Form initialValues={{name: ''}}>
            <Input label="Name" name="name" id="my-custom-id" />
          </Form>
        );
        expect(container).toMatchSnapshot();
      });

      it('with input props and field props ', () => {
        const {container} = render(
          <Form initialValues={{name: ''}}>
            <Input
              label="Name"
              name="name"
              inputProps={{type: 'password'}}
              fieldProps={{width: '8'}}
            />
          </Form>
        );
        expect(container).toMatchSnapshot();
      });
    });

    it('Checkbox: default ', () => {
      const {container} = render(
        <Form initialValues={{checked: true}}>
          <Checkbox label="Checked" name="checked" />
        </Form>
      );
      expect(container).toMatchSnapshot();
    });

    it('TextArea: default ', () => {
      const {container} = render(
        <Form initialValues={{name: ''}}>
          <TextArea label="Name" name="name" />
        </Form>
      );
      expect(container).toMatchSnapshot();
    });

    it('Dropdown: default ', () => {
      const {container} = render(
        <Form initialValues={{name: ''}}>
          <Dropdown
            label="Name"
            name="name"
            options={[
              {text: 'Justin', value: 'justin'},
              {text: 'Not Justin', value: 'not-justin'},
            ]}
          />
        </Form>
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Form', () => {
    it('child as a function', async () => {
      const handleSubmit = jest.fn();

      const {container, getByText} = render(
        <Form initialValues={{name: ''}} onSubmit={handleSubmit}>
          {({isSubmitting}) => (
            <React.Fragment>
              <Button.Submit disabled={isSubmitting}>Submit</Button.Submit>
            </React.Fragment>
          )}
        </Form>
      );

      const submitButton = getByText('Submit');

      await fireEvent.click(submitButton);
      await fireEvent.click(submitButton);

      await wait(() => {
        expect(handleSubmit).toHaveBeenCalled();
      });

      expect(handleSubmit.mock.calls.length).toEqual(1);
      expect(container).toMatchSnapshot();
    });

    it('render props', async () => {
      const {container, getByText} = render(
        <Form
          initialValues={{name: ''}}
          onSubmit={() => {}}
          render={({isSubmitting}) => (
            <React.Fragment>
              <Button.Submit disabled={isSubmitting}>Submit</Button.Submit>
            </React.Fragment>
          )}
        />
      );

      const submitButton = getByText('Submit');
      await fireEvent.click(submitButton);
      expect(container).toMatchSnapshot();
    });

    it('ignore loading', async () => {
      const {container, getByText} = render(
        <Form
          initialValues={{name: ''}}
          ignoreLoading
          onSubmit={() => {}}
          render={({isSubmitting}) => (
            <React.Fragment>
              <Button.Submit disabled={isSubmitting}>Submit</Button.Submit>
            </React.Fragment>
          )}
        />
      );

      const submitButton = getByText('Submit');
      await fireEvent.click(submitButton);
      expect(container).toMatchSnapshot();
    });
  });

  describe('Buttons', () => {
    it('default', () => {
      const {container} = render(
        <Form initialValues={{name: ''}}>
          <Button>Basic Button</Button>
        </Form>
      );
      expect(container).toMatchSnapshot();
    });

    it('Button.Submit', () => {
      const {container} = render(
        <Form initialValues={{name: ''}}>
          <Button.Submit>Basic Button</Button.Submit>
        </Form>
      );
      expect(container).toMatchSnapshot();
    });

    it('Button.Reset', () => {
      const {container} = render(
        <Form initialValues={{name: ''}}>
          <Button.Reset>Basic Button</Button.Reset>
        </Form>
      );
      expect(container).toMatchSnapshot();
    });
  });
});