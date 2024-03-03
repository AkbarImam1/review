import React, { useState, useEffect } from 'react';
import { Container, Tooltip, makeStyles, IconButton } from '@material-ui/core';
import { FaStar, FaUser, FaEllipsisV, FaSave, FaCircle, FaUserPlus } from 'react-icons/fa';
import reviewData from './review.json';

const useStyles = makeStyles(theme => ({
    tooltip: {
        backgroundColor: 'lightblue',
        color: 'black',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #ccc',
    },
    reviewContainer: {
        marginBottom: 20,
        padding: 10,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        position: 'relative',
    },
    userIcon: {
        marginRight: 5,
    },
    userName: {
        fontSize: '1.2rem',
        marginBottom: 5,
    },
    starContainer: {
        display: 'flex',
        marginBottom: 5,
    },
    star: {
        marginRight: 5,
        color: '#FFD700',
    },
    topRightIcons: {
        position: 'absolute',
        top: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1),
    },
    iconButton: {
        padding: 0,
        marginRight: theme.spacing(1),
    },
}));

const App = () => {
    const [reviews, setReviews] = useState([]);
    const [openTooltip, setOpenTooltip] = useState(false);
    const [tooltipText, setTooltipText] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        setReviews(reviewData);
    }, []);

    const handleTooltipOpen = (ev, text) => {
        setTooltipText(text);
        setAnchorEl(ev.currentTarget);
        setOpenTooltip(true);
    };

    const handleTooltipClose = () => {
        setOpenTooltip(false);
    };

    return (
        <Container>
            <h1>Reviews</h1>
            {reviews.map(review => (
                <div key={review.reviewer_name} className={classes.reviewContainer}>
                    <div className={classes.topRightIcons}>
                        <IconButton className={classes.iconButton} onClick={() => console.log('Save')}>
                            <FaSave />
                        </IconButton>
                        <IconButton className={classes.iconButton} onClick={() => console.log('Follow')}>
                            <FaUserPlus />
                        </IconButton>
                        <IconButton className={classes.iconButton} >
                            <FaEllipsisV />
                        </IconButton>
                        <FaCircle style={{ color: 'transparent' }} />
                    </div>
                    <div className={classes.userName}>
                        <FaUser className={classes.userIcon} />
                        {review.reviewer_name}
                    </div>
                    <div className={classes.starContainer}>
                        {[...Array(Math.max(1, Math.min(5, review.rating_review_score)))].map((star, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                <FaStar
                                    key={index}
                                    className={classes.star}
                                    size={14}
                                />
                            </div>
                        ))}
                        <span style={{ marginLeft: '5px' }}>{review.date}</span>
                    </div>
                    <p>{review.content}</p>
                    {review.analytics.map(analytic => (
                        <p key={analytic.topic}>
                            {analytic.sentences.map((sentence, index) => (
                                <Tooltip
                                    key={index}
                                    title={analytic.topic}
                                    open={openTooltip && tooltipText === analytic.topic}
                                    onClose={handleTooltipClose}
                                    disableFocusListener
                                    disableHoverListener
                                    disableTouchListener
                                    classes={{ tooltip: classes.tooltip }}
                                >
                                    <span
                                        style={{
                                            cursor: 'pointer',
                                            backgroundColor:
                                                analytic.sentiment === 'Positive'
                                                    ? '#D9F2DD'
                                                    : analytic.sentiment === 'Negative'
                                                        ? '#F2DBD9'
                                                        : analytic.sentiment === 'Mixed'
                                                            ? '#e8bd6d3d'
                                                            : '#eaf09b6b',
                                        }}
                                        onClick={(ev) => handleTooltipOpen(ev, analytic.topic)}
                                    >
                                        {sentence}
                                    </span>
                                </Tooltip>
                            ))}
                        </p>
                    ))}
                </div>
            ))}
        </Container>
    );
};

export default App;
