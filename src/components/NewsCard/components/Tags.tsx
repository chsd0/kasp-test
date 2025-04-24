import { Flex, Typography } from "antd"
import { useState, ReactNode, useContext } from "react";
import { NewsCtx } from "../NewsCard";
import { IData_TagItem } from '../types';
import styles from '../styles/NewsCard.module.scss';

export const Tags = () => {
    const newsCtx = useContext(NewsCtx);
    if(!newsCtx) {
        return;
    }
    const { KW } = newsCtx;
    const [allTagsVisible, setAllTagsVisibility] = useState<boolean>(false);
    
    const getTags = (tags: IData_TagItem[]): ReactNode[] => {
        const nodeArr = tags.map((keyword, idx) => {
            if(idx <= 5 || allTagsVisible) {
                return (
                    <Flex gap='10px' className={styles['keyword']} key={idx}>
                        <Typography.Text className={styles['text']}>{keyword.value}</Typography.Text>
                        <Typography.Text className={styles['text-highlight']}>{keyword.count}</Typography.Text>
                    </Flex>
                );
            }
        });
        if(tags.length > 5){
            nodeArr.push(
                <Typography.Text key={tags.length} className={styles['keyword__show-all']} 
                                 onClick={() => setAllTagsVisibility(!allTagsVisible)}>
                    {allTagsVisible ? 'Collapse' : `Show All +${tags.length - 6}`}
                </Typography.Text>
            );
        }
        return nodeArr;
    };

    return (
        <Flex gap='10px' className={styles['keyword-wrapper']}>
            {getTags(KW).map(node => node)}
        </Flex>
    )
}