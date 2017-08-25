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
  Input
} from 'reactstrap';
import { equals } from '../constants/objectEquals';

class Address extends React.Component {
  constructor(props) {
    super(props);

    this.callSearch = debounce(this.callSearch, 400);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      cityInput: props.addresses[props.index].address.city
        || props.addresses[props.index].address.suburb
        || props.addresses[props.index].address.hamlet
        || props.addresses[props.index].address.town
        || props.addresses[props.index].address.residential
        || props.addresses[props.index].address.city_district
        || props.addresses[props.index].address.village
        || 'No city added',
      streetInput: props.addresses[props.index].address.road
        || 'No street added',
      zipInput: props.addresses[props.index].address.postcode
        || 'No zip code added'
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.addresses[this.props.index].display_name !== nextProps.addresses[nextProps.index].display_name) {
      this.setState({
        cityInput: nextProps.addresses[nextProps.index].address.city
        || nextProps.addresses[nextProps.index].address.suburb
        || nextProps.addresses[nextProps.index].address.hamlet
        || nextProps.addresses[nextProps.index].address.town
        || nextProps.addresses[nextProps.index].address.residential
        || nextProps.addresses[nextProps.index].address.city_district
        || nextProps.addresses[nextProps.index].address.village
        || 'No city added',
        streetInput: nextProps.addresses[nextProps.index].address.road
        || 'No street added',
        zipInput: nextProps.addresses[nextProps.index].address.postcode
        || 'No zip code added'
      });
    }
  }

  callSearch(event, field) {
    if (event.target.value.length > 2) {
      if (field === 'cityInput') {
        this.props.getAddressesByName('city', event.target.value);
      }

      if (field === 'streetInput') {
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
        this.setState({
          cityInput: this.props.addresses[index].address.city
            || this.props.addresses[index].address.suburb
            || this.props.addresses[index].address.hamlet
            || this.props.addresses[index].address.town
            || this.props.addresses[index].address.residential
            || this.props.addresses[index].address.city_district
            || this.props.addresses[index].address.village
            || 'No city added',
          streetInput: this.props.addresses[this.props.index].address.road
            || 'No street added',
          zipInput: this.props.addresses[this.props.index].address.postcode
            || 'No zip code added'
        });
      });
  }

  render() {
    return (
      <Form className='mt-3'>
        <FormGroup>
          <Label for='city'>City: </Label>
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
              id: 'city'
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
          <Label for='street'>Street</Label>
          <Autocomplete
            selectOnBlur={true}
            getItemValue={(item) => item.display_name}
            items={this.props.possibleAddresses}
            value={this.state.streetInput}
            onSelect={(value, state) => this.onSelectAddress(state, this.props.index) }
            onChange={(event) => this.handleInputChange(event, 'streetInput')}
            renderItem={(item) =>
              <a href="#" className="list-group-item list-group-item-action">
                {item.display_name}
              </a>
            }
            inputProps={{
              className: 'form-control',
              id: 'street'
            }}
            wrapperStyle={{
              overflow: 'hidden'
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
              id: 'zip'
            }}
            wrapperStyle={{
              overflow: 'hidden'
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
  getAddressesByName: PropTypes.func.isRequired,
  setAddress:         PropTypes.func.isRequired
};

Address.defaultProps = {
  index: 0,
  addresses: [],
  possibleAddresses: []
};

const mapStateToProps = (state) => {
  return {
    addresses:         state.Reducer.addresses,
    possibleAddresses: state.Reducer.possibleAddresses
  };
};

const mapDispatchToProps = {
  getAddressesByName: reducerActions.getAddressesByName,
  setAddress:         reducerActions.setAddress
};

export default connect(mapStateToProps, mapDispatchToProps)(Address);
