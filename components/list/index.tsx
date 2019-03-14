import List from './List';
import ListItem from './ListItem';
import RankListItem from './RankListItem';
import CateListItem from './CateListItem';
import PicDescItem from './PicDescItem';

export {ListProps} from './List';
export {ListItemProps} from './ListItem';
export {RankListItemProps} from './RankListItem';
export {CateListItemProps} from './CateListItem';
export {PicDescItemProps} from './PicDescItem';


List.Item = ListItem;
List.PicDesc = PicDescItem;
List.RandItem = RankListItem;
List.CateItem = CateListItem;

export default List;
