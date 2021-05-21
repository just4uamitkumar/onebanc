import { userData } from './userData';
import { FaUserAlt } from 'react-icons/fa'

function Users(props) {
    return (
        <div className="userList">
            <ul>
                {
                    userData.map((e, index) =>
                        <li key={index} onClick={props.showTransaction}>
                            <span className="userIcon">
                                <FaUserAlt />
                            </span>
                            <span className="userName">{e.name}</span>
                        </li>
                    )}
            </ul>
        </div>
    );
}

export default Users;