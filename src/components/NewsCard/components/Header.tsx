import { FC, useContext } from 'react';
import { Typography, Flex, Tag } from 'antd';
import { NewsCtx } from '../NewsCard';
import { formatDate, upperFirstLetter } from '@utils';
import BoxIcon from '@assets/box.svg?react';
import InformationIcon from '@assets/information.svg?react';
import styles from '../styles/NewsCard.module.scss';
import { IData_SnippetNews } from '../types';

const { Text } = Typography;

export const Header: FC<{data?: IData_SnippetNews}> = ({ data }) => {
    let DP: string = ''
    let REACH: number = 0;
    let TRAFFIC: Array<{value: string, count: number}> = [];
    let SENT: string = '';

    if (!data) {
        const ctx = useContext(NewsCtx);
        if (!ctx) {
            return <Text>Unable to load data</Text>;
        }

        ({ DP, REACH, TRAFFIC, SENT } = ctx);
        SENT = upperFirstLetter(SENT);

        TRAFFIC = TRAFFIC.map(traffic => ({
            value: traffic.value === 'United States of America' ? 'USA' : traffic.value,
            count: traffic.count
        }));
    } else {
        ({ DP, REACH } = data);
    }

    const {highlight: day, rest: monthYear} = formatDate(DP);

    return (
        <Flex justify='space-between' align='start'>
            <Flex align='middle' className={styles['news-card__header']} gap='20px'>
                <Flex>
                    <Text className={styles['text-highlight']}>{day}&nbsp;</Text> 
                    <Text className={styles['text']}>{monthYear}</Text>
                </Flex>
                <Flex>
                    <Text className={styles['text-highlight']}>{REACH}&nbsp;</Text> 
                    <Text className={styles['text']}>Reach</Text>
                </Flex>
                {!data && (
                    <Flex >
                        <Text className={styles['text']}>Top Traffic:&nbsp;</Text>
                        {TRAFFIC.map((traffic, idx) => (
                            <Text className={styles['text']} key={idx}> {traffic.value}&nbsp;
                                <Text className={styles['text-highlight']}>{Math.floor(traffic.count * 100)}%&nbsp;</Text> 
                            </Text> 
                        ))}
                    </Flex>
                )}
            </Flex>
            <Flex gap='15px' className={styles['header__icon-block']}>
                {!data && (
                <Tag color={SENT === 'Positive' ? '#23ffb0' : '#ff2323'} className={styles['header__sentiment']}>{SENT}</Tag>
                )}
                <InformationIcon className={styles['header__icon']}/>
                <BoxIcon className={styles['header__icon-secondary']}/>
            </Flex>
        </Flex>
    )
};

