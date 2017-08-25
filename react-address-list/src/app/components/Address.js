import React               from 'react';
import PropTypes           from 'prop-types';
import Autocomplete        from 'react-autocomplete';
import { connect         } from 'react-redux';
import { debounce        } from './../constants/debounce';
import * as reducerActions from './../actions/reducerActions';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

class Address extends React.Component {
  constructor(props) {
    super(props);

    this.callSearch = debounce(this.callSearch, 400);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = this.getCurrentFormState(props);
  }

  getCurrentFormState(props, isEditing = false) {
    console.log(props.addresses[props.index].address);
    return {
      cityInput: props.addresses[props.index].address.city
      || props.addresses[props.index].address.suburb
      || props.addresses[props.index].address.hamlet
      || props.addresses[props.index].address.town
      || props.addresses[props.index].address.residential
      || props.addresses[props.index].address.city_district
      || props.addresses[props.index].address.village
      || 'No city added',
      addressInput:
        ((props.addresses[props.index].address.address29 ? (props.addresses[props.index].address.address29) : '')
      + (props.addresses[props.index].address.road ? (props.addresses[props.index].address.road) : '')
      + (props.addresses[props.index].address.house_number ? (', ' + props.addresses[props.index].address.house_number) : '')
      + (props.addresses[props.index].address.neighbourhood ? (', ' + props.addresses[props.index].address.neighbourhood) : ''))
        || 'No address added',
      zipInput: props.addresses[props.index].address.postcode
      || 'No zip code added',
      isEditing: isEditing
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.addresses[this.props.index].display_name !== nextProps.addresses[nextProps.index].display_name) {
      this.setState(this.getCurrentFormState(nextProps, true));
    }
  }

  callSearch(event, field) {
    if (event.target.value.length > 2) {
      if (field === 'cityInput') {
        this.props.getAddressesByName('city', event.target.value)
          .then(() => {
            console.log(this.props.possibleAddresses);
          });
      }

      if (field === 'addressInput') {
        this.props.getAddressesByName('street', event.target.value);
      }

      if (field === 'zipInput') {
        this.props.getAddressesByName('postalcode', event.target.value);
      }
    }
  }

  handleInputChange(event, field) {
    event.persist();
    this.setState({
      [field]: event.target.value
    });

    this.callSearch(event, field);
  }

  onSelectAddress(address, index) {
    this.props.setAddress(address, index)
      .then(() => {
        this.setState(this.getCurrentFormState(this.props, true));
      });
  }

  render() {
    return (
      <Form className='mt-3'>
        <FormGroup className='d-flex justify-content-end'>
          <Button
            color='info'
            onClick={() => {
              this.setState({
                isEditing: !this.state.isEditing
              });
            }}
          >
            Edit
          </Button>
        </FormGroup>
        <FormGroup>
          <Label for='city'>City</Label>
          <Autocomplete
            selectOnBlur={true}
            getItemValue={(item) => item.display_name}
            items={this.props.possibleAddresses}
            value={this.state.cityInput}
            onSelect={(value, state) => this.onSelectAddress(state, this.props.index) }
            onChange={(event) => this.handleInputChange(event, 'cityInput')}
            renderItem={(item) =>
              <a href="#" className="list-group-item list-group-item-action">
                {item.display_name}
              </a>
            }
            inputProps={{
              className: 'form-control',
              id: 'city',
              disabled: !this.state.isEditing
            }}
            wrapperStyle={{
              overflow: 'hidden'
            }}
            menuStyle={{
              zIndex: 401,
              position: 'absolute',
              width: '90%',
              minWidth: 'none',
              overflowX: 'hidden'
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label for='address'>Address</Label>
          <Autocomplete
            selectOnBlur={true}
            getItemValue={(item) => item.display_name}
            items={this.props.possibleAddresses}
            value={this.state.addressInput}
            onSelect={(value, state) => this.onSelectAddress(state, this.props.index) }
            onChange={(event) => this.handleInputChange(event, 'addressInput')}
            renderItem={(item) =>
              <a href="#" className="list-group-item list-group-item-action">
                {item.display_name}
              </a>
            }
            inputProps={{
              className: 'form-control',
              id: 'address',
              disabled: !this.state.isEditing
            }}
            wrapperStyle={{
              overflow: 'hidden'
            }}
            menuStyle={{
              zIndex: 401,
              position: 'absolute',
              width: '90%',
              minWidth: 'none',
              overflowX: 'hidden'
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label for='zip'>ZIP</Label>
          <Autocomplete
            selectOnBlur={true}
            getItemValue={(item) => item.display_name}
            items={this.props.possibleAddresses}
            value={this.state.zipInput}
            onSelect={(value, state) => this.onSelectAddress(state, this.props.index) }
            onChange={(event) => this.handleInputChange(event, 'zipInput')}
            renderItem={(item) =>
              <a href="#" className="list-group-item list-group-item-action">
                {item.display_name}
              </a>
            }
            inputProps={{
              className: 'form-control',
              id: 'zip',
              disabled: !this.state.isEditing
            }}
            wrapperStyle={{
              overflow: 'hidden'
            }}
            menuStyle={{
              zIndex: 401,
              position: 'absolute',
              width: '90%',
              minWidth: 'none',
              overflowX: 'hidden'
            }}
          />
        </FormGroup>
      </Form>
    );
  }
}

Address.propTypes = {
  index:              PropTypes.number,
  addresses:          PropTypes.array,
  possibleAddresses:  PropTypes.array,
  coordinateSearchAddress: PropTypes.object,
  getAddressesByName: PropTypes.func.isRequired,
  setAddress:         PropTypes.func.isRequired,
  getAddressByCoordinates: PropTypes.func.isRequired
};

Address.defaultProps = {
  index: 0,
  addresses: [],
  possibleAddresses: []
};

const mapStateToProps = (state) => {
  return {
    addresses:         state.Reducer.addresses,
    possibleAddresses: state.Reducer.possibleAddresses,
    coordinateSearchAddress: state.Reducer.coordinateSearchAddress
  };
};

const mapDispatchToProps = {
  getAddressesByName: reducerActions.getAddressesByName,
  setAddress:         reducerActions.setAddress,
  getAddressByCoordinates: reducerActions.getAddressByCoordinates
};

export default connect(mapStateToProps, mapDispatchToProps)(Address);
