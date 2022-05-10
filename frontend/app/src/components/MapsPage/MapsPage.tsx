import React from 'react';
import './MapsPage.scss';
import { useSelector } from "react-redux";
import { mapsService } from '../../services/maps-service';


class MapsPage extends React.Component {

    // const dispatch = useDispatch();

    componentDidMount() {
        //const filter = useSelector((state) => state.filter);
        // mapsService.setFilter(filter);
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className="MapsPage">
                { JSON.stringify({ key: 'rest' }) }
            </div>
        )
    }
}

export default MapsPage;
